import React from 'react'
import { createRoot } from 'react-dom/client'
import { BootstrapStyledProvider } from '../src'
import { cells, type Cell } from './fixtures'

/**
 * The parity render rig. Both sides render the SAME fixture set into identical
 * `[data-cell-id]` wrappers so the Playwright runner can screenshot the matching
 * element on each side and pixel-diff them.
 *
 *   ?side=native  → raw Bootstrap markup + vendored oracle CSS/JS
 *   ?side=styled  → the equivalent bootstrap-styled React components
 *
 * The shared cell CSS below is applied on BOTH sides so only the component
 * itself differs.
 */

const side = new URLSearchParams(location.search).get('side') === 'native' ? 'native' : 'styled'
document.documentElement.dataset.side = side

// Shared, bootstrap-agnostic cell chrome (present identically on both sides).
const sharedCss = `
  :root { color-scheme: light; }
  body { margin: 0; background: #ffffff; }
  #root { padding: 8px; }
  .parity-grid { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 24px; }
  .parity-cell {
    background: #ffffff;
    padding: 16px;
    /* No border/shadow: keep the captured box = the component only. */
  }
  .parity-cell > .parity-label {
    display: none; /* labels are metadata; not part of the pixel capture */
  }
`
const styleEl = document.createElement('style')
styleEl.textContent = sharedCss
document.head.appendChild(styleEl)

if (side === 'native') {
  // Vendored oracle CSS (hermetic — served from ./oracle, no CDN).
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = './oracle/bootstrap.min.css'
  document.head.appendChild(link)
  // Vendored oracle behavior bundle (proves it loads; used by P2/P3 behavior).
  const js = document.createElement('script')
  js.src = './oracle/bootstrap.bundle.min.js'
  document.body.appendChild(js)
}

function NativeCell({ cell }: { cell: Cell }) {
  return (
    <div
      className="parity-cell"
      data-cell-id={cell.id}
      data-component={cell.component}
      data-note={cell.note || ''}
    >
      <div className="parity-label">{cell.label}</div>
      <div dangerouslySetInnerHTML={{ __html: cell.native }} />
    </div>
  )
}

function StyledCell({ cell }: { cell: Cell }) {
  return (
    <div
      className="parity-cell"
      data-cell-id={cell.id}
      data-component={cell.component}
      data-note={cell.note || ''}
    >
      <div className="parity-label">{cell.label}</div>
      {cell.styled}
    </div>
  )
}

function App() {
  const grid = (
    <div className="parity-grid">
      {cells.map((cell) =>
        side === 'native' ? (
          <NativeCell key={cell.id} cell={cell} />
        ) : (
          <StyledCell key={cell.id} cell={cell} />
        ),
      )}
    </div>
  )

  if (side === 'native') {
    // Native markup owns its own styling via the oracle CSS — no Provider.
    return grid
  }
  // Styled side: mount under the Provider (injects --bs-* vars + GlobalStyles).
  return <BootstrapStyledProvider>{grid}</BootstrapStyledProvider>
}

// Signal to Playwright that the tree is mounted and cells are queryable.
const rootEl = document.getElementById('root')!
createRoot(rootEl).render(<App />)
// Set a ready flag after paint so the runner can wait on it deterministically.
requestAnimationFrame(() => requestAnimationFrame(() => (window as any).__PARITY_READY__ = true))
