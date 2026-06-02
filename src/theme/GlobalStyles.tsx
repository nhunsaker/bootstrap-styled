import { createGlobalStyle } from 'styled-components'
import type { Theme, ColorName } from './types'
import { darkOverrides } from './defaultTheme'
import { colorContrast } from './color'

const COLOR_NAMES: ColorName[] = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
]

// Build the :root variable block from the theme — each color plus a computed
// `--bs-<color>-contrast` for legible on-color text.
const rootVars = (t: Theme): string => {
  const colors = COLOR_NAMES.map(
    (n) => `--bs-${n}: ${t.colors[n]}; --bs-${n}-contrast: ${colorContrast(t.colors[n])};`,
  ).join('\n    ')
  return `
    ${colors}
    --bs-body-bg: ${t.body.bg};
    --bs-body-color: ${t.body.color};
    --bs-border-color: ${t.border.color};
    --bs-border-radius: ${t.radius.base};
    --bs-border-radius-sm: ${t.radius.sm};
    --bs-border-radius-lg: ${t.radius.lg};
    --bs-border-radius-pill: ${t.radius.pill};
    --bs-link-color: var(--bs-primary);
    --bs-link-hover-color: color-mix(in srgb, var(--bs-primary) 80%, #000);
    --bs-font-sans-serif: ${t.font.sansSerif};
    --bs-body-font-size: ${t.font.size.base};
    --bs-font-weight-normal: ${t.font.weight.normal};
    --bs-font-weight-semibold: ${t.font.weight.semibold};
    --bs-font-weight-bold: ${t.font.weight.bold};
  `
}

// `theme` comes from styled-components context (typed via DefaultTheme), so no
// theme prop is required at the call site.
export const GlobalStyles = createGlobalStyle`
  :root {
    ${(p) => rootVars(p.theme)}
  }

  [data-bs-theme='dark'] {
    --bs-body-bg: ${darkOverrides.body.bg};
    --bs-body-color: ${darkOverrides.body.color};
    --bs-border-color: ${darkOverrides.border.color};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-size: var(--bs-body-font-size);
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
  }
`
