import { createGlobalStyle } from 'styled-components'
import { darkOverrides } from './defaultTheme'

// Projects the theme onto Bootstrap's `--bs-*` custom properties + a base reset.
// `theme` comes from styled-components context (typed via the DefaultTheme
// augmentation), so no theme prop is required at the call site. Components read
// the vars, so overriding them (color mode, Figtree preview) re-skins
// everything without React re-rendering.
export const GlobalStyles = createGlobalStyle`
  :root {
    --bs-primary: ${(p) => p.theme.colors.primary};
    --bs-secondary: ${(p) => p.theme.colors.secondary};
    --bs-success: ${(p) => p.theme.colors.success};
    --bs-danger: ${(p) => p.theme.colors.danger};
    --bs-warning: ${(p) => p.theme.colors.warning};
    --bs-info: ${(p) => p.theme.colors.info};
    --bs-light: ${(p) => p.theme.colors.light};
    --bs-dark: ${(p) => p.theme.colors.dark};

    --bs-body-bg: ${(p) => p.theme.body.bg};
    --bs-body-color: ${(p) => p.theme.body.color};
    --bs-border-color: ${(p) => p.theme.border.color};
    --bs-border-radius: ${(p) => p.theme.border.radius};
    --bs-font-sans-serif: ${(p) => p.theme.font.sansSerif};
    --bs-body-font-size: ${(p) => p.theme.font.size};
  }

  [data-bs-theme='dark'] {
    --bs-body-bg: ${darkOverrides.body.bg};
    --bs-body-color: ${darkOverrides.body.color};
    --bs-border-color: ${darkOverrides.border.color};
  }

  body {
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-size: var(--bs-body-font-size);
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
  }
`
