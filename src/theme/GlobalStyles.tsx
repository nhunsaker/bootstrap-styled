import { createGlobalStyle } from 'styled-components'
import type { Theme, ColorName } from './types'
import { darkOverrides } from './defaultTheme'
import { colorContrast } from './color'

const COLOR_NAMES: ColorName[] = [
  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
]

// `BootstrapStyledProvider` always renders `<div data-bs-theme={colorMode}>` around
// its children (see Provider.tsx) — that's the one DOM anchor every consumer already
// gets "for free", regardless of `colorMode`'s value. We reuse the *presence* of that
// attribute (not its value) as the Reboot scope root, and wrap it in `:where()` so it
// contributes zero specificity — every scoped rule below ends up at the exact same
// specificity as Bootstrap's own bare-element Reboot selectors (0,0,1), so a host app's
// own `h1 {}`/`button {}` (or the real Bootstrap stylesheet, for oracle parity diffing)
// still wins on source order / equal specificity, same as it would against upstream
// Bootstrap. Only markup actually rendered *inside* the Provider is affected; anything
// outside it (the rest of the host page) is untouched.
const ROOT = ':where([data-bs-theme])'

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
//
// NOTE on what stays unscoped vs scoped:
// - `:root { --bs-*: ...; }` and `[data-bs-theme='dark'] { --bs-*: ...; }` only ever
//   *declare* custom properties — they have no visual effect on a host element unless
//   that element's own CSS opts in with `var(--bs-…)`, so leaving them global is safe
//   (this mirrors how the real Bootstrap stylesheet declares its `--bs-*` palette on
//   `:root`/`[data-bs-theme]` too).
// - Every rule that actually *paints* something (the Reboot proper — box-sizing, body-
//   level typography, headings/lists/tables/forms/etc.) is rewritten below to be
//   `${ROOT} <selector>`, i.e. scoped under the Provider's own wrapper div, instead of
//   the old bare `*`/`body`/`h1..h6`/`p`/`ul` selectors that hit the entire host page.
export const GlobalStyles = createGlobalStyle`
  :root {
    ${(p) => rootVars(p.theme)}
  }

  [data-bs-theme='dark'] {
    --bs-body-bg: ${darkOverrides.body.bg};
    --bs-body-color: ${darkOverrides.body.color};
    --bs-border-color: ${darkOverrides.border.color};
  }

  /* --- Reboot, scoped to the bootstrap-styled subtree -------------------------- */

  ${ROOT},
  ${ROOT} *,
  ${ROOT} *::before,
  ${ROOT} *::after {
    box-sizing: border-box;
  }

  /* Stands in for Bootstrap's body reset: the Provider's own wrapper div is the
     "app root" for the subtree it owns, the same role the body element plays in a page
     that is Bootstrap end-to-end. The literal document body is never touched. */
  ${ROOT} {
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-font-weight-normal);
    line-height: 1.5;
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  ${ROOT} hr {
    margin: 1rem 0;
    color: inherit;
    border: 0;
    border-top: 1px solid;
    opacity: 0.25;
  }

  ${ROOT} h1, ${ROOT} h2, ${ROOT} h3, ${ROOT} h4, ${ROOT} h5, ${ROOT} h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }
  ${ROOT} h1 { font-size: calc(1.375rem + 1.5vw); }
  ${ROOT} h2 { font-size: calc(1.325rem + 0.9vw); }
  ${ROOT} h3 { font-size: calc(1.3rem + 0.6vw); }
  ${ROOT} h4 { font-size: calc(1.275rem + 0.3vw); }
  ${ROOT} h5 { font-size: 1.25rem; }
  ${ROOT} h6 { font-size: 1rem; }
  @media (min-width: 1200px) {
    ${ROOT} h1 { font-size: 2.5rem; }
    ${ROOT} h2 { font-size: 2rem; }
    ${ROOT} h3 { font-size: 1.75rem; }
    ${ROOT} h4 { font-size: 1.5rem; }
  }

  ${ROOT} p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ${ROOT} abbr[title] {
    text-decoration: underline dotted;
    cursor: help;
    text-decoration-skip-ink: none;
  }

  ${ROOT} address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
  }

  ${ROOT} ol, ${ROOT} ul {
    padding-left: 2rem;
  }
  ${ROOT} dl, ${ROOT} ol, ${ROOT} ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  ${ROOT} ol ol, ${ROOT} ol ul, ${ROOT} ul ol, ${ROOT} ul ul {
    margin-bottom: 0;
  }
  ${ROOT} dt {
    font-weight: 700;
  }
  ${ROOT} dd {
    margin-bottom: 0.5rem;
    margin-left: 0;
  }

  ${ROOT} blockquote {
    margin: 0 0 1rem;
  }

  ${ROOT} b, ${ROOT} strong {
    font-weight: bolder;
  }

  ${ROOT} small {
    font-size: 0.875em;
  }

  ${ROOT} mark {
    padding: 0.1875em;
    color: #212529;
    background-color: #fff3cd;
  }

  ${ROOT} sub, ${ROOT} sup {
    position: relative;
    font-size: 0.75em;
    line-height: 0;
    vertical-align: baseline;
  }
  ${ROOT} sub { bottom: -0.25em; }
  ${ROOT} sup { top: -0.5em; }

  ${ROOT} a {
    color: var(--bs-link-color);
    text-decoration: underline;
  }
  ${ROOT} a:hover {
    color: var(--bs-link-hover-color);
  }
  ${ROOT} a:not([href]):not([class]),
  ${ROOT} a:not([href]):not([class]):hover {
    color: inherit;
    text-decoration: none;
  }

  ${ROOT} code, ${ROOT} kbd, ${ROOT} pre, ${ROOT} samp {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    font-size: 1em;
  }
  ${ROOT} pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
    font-size: 0.875em;
  }
  ${ROOT} pre code {
    font-size: inherit;
    color: inherit;
    word-break: normal;
  }
  ${ROOT} code {
    font-size: 0.875em;
    color: #d63384;
    word-wrap: break-word;
  }
  ${ROOT} a > code {
    color: inherit;
  }
  ${ROOT} kbd {
    padding: 0.1875rem 0.375rem;
    font-size: 0.875em;
    color: var(--bs-body-bg);
    background-color: var(--bs-body-color);
    border-radius: 0.25rem;
  }
  ${ROOT} kbd kbd {
    padding: 0;
    font-size: 1em;
  }

  ${ROOT} figure {
    margin: 0 0 1rem;
  }

  ${ROOT} img, ${ROOT} svg {
    vertical-align: middle;
  }

  ${ROOT} table {
    caption-side: bottom;
    border-collapse: collapse;
  }
  ${ROOT} caption {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: rgba(33, 37, 41, 0.75);
    text-align: left;
  }
  ${ROOT} th {
    text-align: inherit;
    text-align: -webkit-match-parent;
  }
  ${ROOT} tbody, ${ROOT} td, ${ROOT} tfoot, ${ROOT} th, ${ROOT} thead, ${ROOT} tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  ${ROOT} label {
    display: inline-block;
  }

  ${ROOT} button {
    border-radius: 0;
  }
  ${ROOT} button:focus:not(:focus-visible) {
    outline: 0;
  }
  ${ROOT} button, ${ROOT} input, ${ROOT} optgroup, ${ROOT} select, ${ROOT} textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  ${ROOT} button, ${ROOT} select {
    text-transform: none;
  }
  ${ROOT} [role='button'] {
    cursor: pointer;
  }
  ${ROOT} select {
    word-wrap: normal;
  }
  ${ROOT} select:disabled {
    opacity: 1;
  }
  ${ROOT} [type='button'], ${ROOT} [type='reset'], ${ROOT} [type='submit'], ${ROOT} button {
    -webkit-appearance: button;
  }
  ${ROOT} [type='button']:not(:disabled),
  ${ROOT} [type='reset']:not(:disabled),
  ${ROOT} [type='submit']:not(:disabled),
  ${ROOT} button:not(:disabled) {
    cursor: pointer;
  }
  ${ROOT} ::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }
  ${ROOT} textarea {
    resize: vertical;
  }
  ${ROOT} fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }
  ${ROOT} legend {
    float: left;
    width: 100%;
    padding: 0;
    margin-bottom: 0.5rem;
    line-height: inherit;
    font-size: calc(1.275rem + 0.3vw);
  }
  @media (min-width: 1200px) {
    ${ROOT} legend { font-size: 1.5rem; }
  }
  ${ROOT} legend + * {
    clear: left;
  }
  ${ROOT} output {
    display: inline-block;
  }
  ${ROOT} iframe {
    border: 0;
  }
  ${ROOT} summary {
    display: list-item;
    cursor: pointer;
  }
  ${ROOT} progress {
    vertical-align: baseline;
  }
  ${ROOT} [hidden] {
    display: none !important;
  }
`
