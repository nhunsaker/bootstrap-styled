#!/usr/bin/env node
/**
 * Parity harness runner (P0).
 *
 * Deterministic screenshot-diff + axe baseline for the proof set. It:
 *   1. boots the parity Vite dev server (serves the vendored hermetic oracle),
 *   2. drives Playwright/Chromium at a fixed viewport + deviceScaleFactor,
 *      with animations/transitions frozen (spinner etc. captured at rest),
 *   3. screenshots each fixture cell on BOTH sides (native oracle vs styled),
 *   4. pixel-diffs matching cells (padding to a common canvas so size deltas
 *      count as diff), and runs axe-core on each side,
 *   5. emits parity/scorecard.json (machine) + parity/scorecard.md (human)
 *      and per-cell diff PNGs under parity/results/.
 *
 * Run:  npm run parity
 * PATH note: if the shell PATH is polluted, prefix with
 *   export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/homebrew/bin
 */
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { chromium } from 'playwright'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const resultsDir = join(__dirname, 'results')
const PORT = 5178
const BASE = `http://localhost:${PORT}`

const VIEWPORT = { width: 1280, height: 1800 }
const DPR = 2

const bootstrapVersion = readFileSync(join(__dirname, 'oracle', 'VERSION'), 'utf8').trim()

// Freeze animation/transition + hide carets so pixel shots are deterministic.
const FREEZE_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
`

function log(...a) {
  console.log('[parity]', ...a)
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url)
      if (r.ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`server did not start within ${timeoutMs}ms`)
}

function startServer() {
  const viteBin = join(repoRoot, 'node_modules', 'vite', 'bin', 'vite.js')
  const child = spawn(
    process.execPath,
    [viteBin, '--config', join(__dirname, 'vite.config.ts')],
    {
      cwd: repoRoot,
      stdio: 'ignore',
      env: { ...process.env },
    },
  )
  return child
}

/** Pad an RGBA PNG to (w,h) on a white background. */
function padToWhite(png, w, h) {
  const out = new PNG({ width: w, height: h })
  out.data.fill(255) // white, opaque
  PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0)
  return out
}

/** Capture one side: returns Map<cellId, { buffer, box, axe }>. */
async function captureSide(browser, side) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DPR,
    reducedMotion: 'reduce',
    colorScheme: 'light',
  })
  const page = await context.newPage()
  await page.goto(`${BASE}/?side=${side}`, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => window.__PARITY_READY__ === true, { timeout: 15000 })
  await page.addStyleTag({ content: FREEZE_CSS })
  // Let the oracle bundle settle and freeze apply.
  await page.waitForTimeout(300)

  // Inject axe-core.
  await page.addScriptTag({ path: join(repoRoot, 'node_modules', 'axe-core', 'axe.min.js') })

  const ids = await page.$$eval('[data-cell-id]', (els) =>
    els.map((e) => e.getAttribute('data-cell-id')),
  )

  const result = new Map()
  for (const id of ids) {
    const el = await page.$(`[data-cell-id="${id}"]`)
    if (!el) continue
    const box = await el.boundingBox()
    const buffer = await el.screenshot({ type: 'png' })
    // axe on the cell subtree.
    const axe = await page.evaluate(async (cellId) => {
      const node = document.querySelector(`[data-cell-id="${cellId}"]`)
      try {
        const r = await window.axe.run(node, {
          resultTypes: ['violations'],
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        })
        return {
          violations: r.violations.length,
          rules: r.violations.map((v) => `${v.id}(${v.nodes.length})`),
        }
      } catch (e) {
        return { violations: -1, rules: [`axe-error: ${String(e)}`] }
      }
    }, id)
    result.set(id, { buffer, box, axe })
  }
  await context.close()
  return result
}

async function main() {
  if (!existsSync(resultsDir)) mkdirSync(resultsDir, { recursive: true })

  log('starting vite server…')
  const server = startServer()
  let browser
  try {
    await waitForServer(`${BASE}/oracle/VERSION`)
    log('server up; launching chromium…')
    browser = await chromium.launch()

    log('capturing native (oracle) side…')
    const native = await captureSide(browser, 'native')
    log(`  ${native.size} native cells`)
    log('capturing styled side…')
    const styled = await captureSide(browser, 'styled')
    log(`  ${styled.size} styled cells`)

    // Load fixture metadata (component/label/note) by re-reading via the page
    // is overkill; instead parse ids we captured and derive component from the
    // data-component attribute we also stored. We re-query it cheaply:
    // (component was embedded as data-component; capture it here.)
    const meta = await metaFromPage(browser)

    const rows = []
    for (const [id, s] of styled) {
      const n = native.get(id)
      if (!n) {
        rows.push({ id, error: 'no native counterpart' })
        continue
      }
      const nPng = PNG.sync.read(n.buffer)
      const sPng = PNG.sync.read(s.buffer)
      const w = Math.max(nPng.width, sPng.width)
      const h = Math.max(nPng.height, sPng.height)
      const nPad = padToWhite(nPng, w, h)
      const sPad = padToWhite(sPng, w, h)
      const diff = new PNG({ width: w, height: h })
      const diffPixels = pixelmatch(nPad.data, sPad.data, diff.data, w, h, {
        threshold: 0.1,
        includeAA: false,
      })
      const totalPixels = w * h
      const diffPct = (diffPixels / totalPixels) * 100
      writeFileSync(join(resultsDir, `${id}.diff.png`), PNG.sync.write(diff))
      writeFileSync(join(resultsDir, `${id}.native.png`), n.buffer)
      writeFileSync(join(resultsDir, `${id}.styled.png`), s.buffer)
      const m = meta.get(id) || {}
      rows.push({
        id,
        component: m.component || id.split('--')[0],
        label: m.label || '',
        note: m.note || '',
        sizeNative: { w: nPng.width, h: nPng.height },
        sizeStyled: { w: sPng.width, h: sPng.height },
        canvas: { w, h },
        diffPixels,
        totalPixels,
        diffPct: Number(diffPct.toFixed(3)),
        axeNativeViolations: n.axe.violations,
        axeStyledViolations: s.axe.violations,
        axeNativeRules: n.axe.rules,
        axeStyledRules: s.axe.rules,
      })
    }

    // Per-component rollup.
    const byComp = new Map()
    for (const r of rows) {
      if (r.error) continue
      const c = r.component
      if (!byComp.has(c)) byComp.set(c, [])
      byComp.get(c).push(r)
    }
    const components = [...byComp.entries()].map(([component, rs]) => {
      const diffs = rs.map((r) => r.diffPct)
      return {
        component,
        cellCount: rs.length,
        avgDiffPct: Number((diffs.reduce((a, b) => a + b, 0) / rs.length).toFixed(3)),
        maxDiffPct: Number(Math.max(...diffs).toFixed(3)),
        minDiffPct: Number(Math.min(...diffs).toFixed(3)),
        axeStyledViolations: rs.reduce((a, r) => a + Math.max(0, r.axeStyledViolations), 0),
        axeNativeViolations: rs.reduce((a, r) => a + Math.max(0, r.axeNativeViolations), 0),
      }
    })

    const scorecard = {
      generatedAt: new Date().toISOString(),
      bootstrapVersion,
      viewport: VIEWPORT,
      deviceScaleFactor: DPR,
      pixelmatch: { threshold: 0.1, includeAA: false, note: 'padded-to-common-canvas white bg' },
      cellCount: rows.length,
      components,
      cells: rows,
    }
    writeFileSync(join(__dirname, 'scorecard.json'), JSON.stringify(scorecard, null, 2))
    writeFileSync(join(__dirname, 'scorecard.md'), renderMarkdown(scorecard))
    log(`wrote scorecard.json + scorecard.md (${rows.length} cells)`)
    // Console summary.
    for (const c of components) {
      log(
        `  ${c.component.padEnd(12)} cells=${String(c.cellCount).padStart(3)}  ` +
          `avg=${String(c.avgDiffPct).padStart(7)}%  max=${String(c.maxDiffPct).padStart(7)}%  ` +
          `axe(styled)=${c.axeStyledViolations}`,
      )
    }
  } finally {
    if (browser) await browser.close()
    server.kill('SIGKILL')
  }
}

/** Grab component/label/note per cell from a fresh styled page render. */
async function metaFromPage(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORT })
  const page = await ctx.newPage()
  await page.goto(`${BASE}/?side=styled`, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => window.__PARITY_READY__ === true, { timeout: 15000 })
  const data = await page.$$eval('[data-cell-id]', (els) =>
    els.map((e) => ({
      id: e.getAttribute('data-cell-id'),
      component: e.getAttribute('data-component'),
      label: e.querySelector('.parity-label')?.textContent || '',
      note: e.getAttribute('data-note') || '',
    })),
  )
  await ctx.close()
  return new Map(data.map((d) => [d.id, d]))
}

function pctBadge(pct) {
  if (pct <= 0.5) return '🟢'
  if (pct <= 3) return '🟡'
  return '🔴'
}

function renderMarkdown(sc) {
  const lines = []
  lines.push('# bootstrap-styled — parity baseline scorecard (P0 proof set)')
  lines.push('')
  lines.push(
    `> Generated ${sc.generatedAt} · Oracle: **Bootstrap ${sc.bootstrapVersion}** (vendored, hermetic) · ` +
      `Viewport ${sc.viewport.width}×${sc.viewport.height} @${sc.deviceScaleFactor}x DPR · ` +
      `animations frozen · pixelmatch threshold ${sc.pixelmatch.threshold}, AA excluded, padded-to-common-canvas.`,
  )
  lines.push('')
  lines.push(
    'Visual-diff % = fraction of pixels differing between the native Bootstrap cell and the ' +
      'equivalent bootstrap-styled cell (each padded to a common white canvas so size deltas count). ' +
      'Lower is better. 🟢 ≤0.5% · 🟡 ≤3% · 🔴 >3%. Axe = WCAG 2.0/2.1 A/AA violations on that cell subtree.',
  )
  lines.push('')
  lines.push('## Per-component summary')
  lines.push('')
  lines.push('| Component | Cells | Avg diff % | Max diff % | Axe (styled) | Axe (native) |')
  lines.push('| --- | ---: | ---: | ---: | ---: | ---: |')
  for (const c of sc.components) {
    lines.push(
      `| ${c.component} | ${c.cellCount} | ${pctBadge(c.avgDiffPct)} ${c.avgDiffPct} | ` +
        `${pctBadge(c.maxDiffPct)} ${c.maxDiffPct} | ${c.axeStyledViolations} | ${c.axeNativeViolations} |`,
    )
  }
  lines.push('')
  lines.push('## Per-cell detail')
  lines.push('')
  lines.push('| Cell | Component | Variant/state | Diff % | Axe styled | Axe native | Note |')
  lines.push('| --- | --- | --- | ---: | ---: | ---: | --- |')
  for (const r of sc.cells) {
    if (r.error) {
      lines.push(`| ${r.id} | | | — | | | ${r.error} |`)
      continue
    }
    const axeS =
      r.axeStyledViolations > 0 ? `${r.axeStyledViolations} (${r.axeStyledRules.join(', ')})` : '0'
    const axeN =
      r.axeNativeViolations > 0 ? `${r.axeNativeViolations} (${r.axeNativeRules.join(', ')})` : '0'
    lines.push(
      `| ${r.id} | ${r.component} | ${r.label} | ${pctBadge(r.diffPct)} ${r.diffPct} | ` +
        `${axeS} | ${axeN} | ${r.note || ''} |`,
    )
  }
  lines.push('')
  lines.push('## Behavior checklist (P0 scaffold — filled in P2/P3)')
  lines.push('')
  lines.push(
    'The proof set is deterministic-visual; the behavior oracle (`bootstrap.bundle.min.js`) is ' +
      'vendored and loaded on the native side, ready for the scripted keyboard/focus/dismiss walks ' +
      'that P2 (behavioral components) and P3 (forms) add. Per-component stubs:',
  )
  lines.push('')
  lines.push('| Component | Keyboard | Focus mgmt | ARIA roles | Dismiss/toggle | Status |')
  lines.push('| --- | --- | --- | --- | --- | --- |')
  for (const c of sc.components) {
    lines.push(`| ${c.component} | — | — | — | — | scaffold (visual+axe only in P0) |`)
  }
  lines.push('')
  return lines.join('\n')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
