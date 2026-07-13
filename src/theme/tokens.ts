import { createGlobalStyle } from 'styled-components'
import type { Theme, ColorName, ColorTokenSet } from './types'

// ---------------------------------------------------------------------------
// ThemeVars — projects the extended Bootstrap 5.3.8 token model onto `--bs-*`
// custom properties (the Sorb bind surface). It is additive to GlobalStyles:
// GlobalStyles owns the base color / body / border / radius(base/sm/lg/pill)
// vars (theme-driven), and ThemeVars completes the set with the -subtle /
// -emphasis / -rgb / body-secondary/tertiary / emphasis-color / translucent /
// shadow / focus-ring / radius-xl/xxl / link-hover / line-height tokens plus
// the [data-bs-theme=dark] flips. Every value is read from the theme, so a
// createTheme() override (or a live `--bs-*` var override) re-shades the
// components that consume it. All defaults are exact 5.3.8 (verified against
// parity/oracle/bootstrap.min.css).
// ---------------------------------------------------------------------------

const COLOR_NAMES: ColorName[] = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
]

/** Per-color -rgb + -subtle/-emphasis declarations for one color mode. */
function colorTokenVars(
  t: Theme,
  tokens: Record<ColorName, ColorTokenSet>,
  includeRgb: boolean,
): string {
  return COLOR_NAMES.map((n) => {
    const ct = tokens[n]
    const rgb = includeRgb ? `--bs-${n}-rgb: ${t.colorRgb[n]};` : ''
    return `${rgb}
    --bs-${n}-text-emphasis: ${ct.emphasis};
    --bs-${n}-bg-subtle: ${ct.bgSubtle};
    --bs-${n}-border-subtle: ${ct.borderSubtle};`
  }).join('\n    ')
}

const lightBlock = (t: Theme): string => `
    ${colorTokenVars(t, t.colorTokens, true)}
    --bs-body-color-rgb: ${t.body.colorRgb};
    --bs-body-bg-rgb: ${t.body.bgRgb};
    --bs-emphasis-color: ${t.emphasisColor};
    --bs-secondary-color: ${t.secondary.color};
    --bs-secondary-bg: ${t.secondary.bg};
    --bs-tertiary-color: ${t.tertiary.color};
    --bs-tertiary-bg: ${t.tertiary.bg};
    --bs-body-line-height: ${t.font.lineHeight.base};
    --bs-body-font-weight: ${t.font.weight.normal};
    --bs-font-monospace: ${t.font.monospace};
    --bs-border-width: ${t.border.width};
    --bs-border-style: ${t.border.style};
    --bs-border-color-translucent: ${t.border.translucent};
    --bs-border-radius-xl: ${t.radius.xl};
    --bs-border-radius-xxl: ${t.radius.xxl};
    --bs-box-shadow: ${t.shadow.base};
    --bs-box-shadow-sm: ${t.shadow.sm};
    --bs-box-shadow-lg: ${t.shadow.lg};
    --bs-box-shadow-inset: ${t.shadow.inset};
    --bs-focus-ring-width: ${t.focusRing.width};
    --bs-focus-ring-opacity: ${t.focusRing.opacity};
    --bs-focus-ring-color: ${t.focusRing.color};
    --bs-link-color: ${t.link.color};
    --bs-link-hover-color: ${t.link.hoverColor};
    --bs-heading-color: ${t.font.headings.color};
`

const darkBlock = (t: Theme): string => `
    ${colorTokenVars(t, t.dark.colorTokens, false)}
    --bs-body-color: ${t.dark.body.color};
    --bs-body-color-rgb: ${t.dark.body.colorRgb};
    --bs-body-bg: ${t.dark.body.bg};
    --bs-body-bg-rgb: ${t.dark.body.bgRgb};
    --bs-emphasis-color: ${t.dark.emphasisColor};
    --bs-secondary-color: ${t.dark.secondary.color};
    --bs-secondary-bg: ${t.dark.secondary.bg};
    --bs-tertiary-color: ${t.dark.tertiary.color};
    --bs-tertiary-bg: ${t.dark.tertiary.bg};
    --bs-border-color: ${t.dark.border.color};
    --bs-border-color-translucent: ${t.dark.border.translucent};
    --bs-link-color: ${t.dark.link.color};
    --bs-link-hover-color: ${t.dark.link.hoverColor};
`

/**
 * Extended `--bs-*` token block. Inject alongside/after GlobalStyles (the
 * Provider does this). `theme` comes from styled-components context.
 */
export const ThemeVars = createGlobalStyle`
  :root {
    ${(p) => lightBlock(p.theme as Theme)}
  }

  [data-bs-theme='dark'] {
    ${(p) => darkBlock(p.theme as Theme)}
  }
`
