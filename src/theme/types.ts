// Bootstrap 5.3 theme contract. Values are plain CSS color/length strings; the
// GlobalStyles + ThemeVars layers project them onto Bootstrap's `--bs-*` custom
// properties (incl. the -subtle/-emphasis token model and computed
// `--bs-<color>-contrast`), and components read those vars — so runtime
// overrides (color modes, or a runtime preview) cascade.

export type ColorName =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

/** Bootstrap spacing scale, indexes 0–5. */
export type Spacing = [string, string, string, string, string, string]

/**
 * Bootstrap 5.3's per-theme-color derived token set. These are the static
 * tints/shades Bootstrap precomputes — alerts/badges/list-groups consume them
 * rather than deriving at runtime. Overriding any one of these (theme field or
 * the matching `--bs-<color>-<slot>` var) re-shades the components that use it,
 * which is exactly the runtime bind surface.
 */
export interface ColorTokenSet {
  /** `--bs-<color>-text-emphasis` — readable on the subtle background. */
  emphasis: string
  /** `--bs-<color>-bg-subtle` — the soft fill. */
  bgSubtle: string
  /** `--bs-<color>-border-subtle` — the soft border. */
  borderSubtle: string
}

/** The theme-color-dependent tokens that flip under `[data-bs-theme=dark]`. */
export interface ColorModeTokens {
  body: { bg: string; color: string; colorRgb: string; bgRgb: string }
  emphasisColor: string
  /** body-secondary / body-tertiary (text-body-secondary et al.). */
  secondary: { color: string; bg: string }
  tertiary: { color: string; bg: string }
  border: { color: string; translucent: string }
  link: { color: string; hoverColor: string }
  colorTokens: Record<ColorName, ColorTokenSet>
}

export interface Theme {
  colors: Record<ColorName, string>
  /** `--bs-<color>-rgb` triplets, e.g. primary → "13,110,253". */
  colorRgb: Record<ColorName, string>
  /** Light-mode -subtle/-emphasis token set per theme color. */
  colorTokens: Record<ColorName, ColorTokenSet>
  body: { bg: string; color: string; colorRgb: string; bgRgb: string }
  emphasisColor: string
  secondary: { color: string; bg: string }
  tertiary: { color: string; bg: string }
  border: { color: string; translucent: string; width: string; style: string }
  link: { color: string; hoverColor: string }
  radius: { sm: string; base: string; lg: string; xl: string; xxl: string; pill: string }
  shadow: { sm: string; base: string; lg: string; inset: string }
  spacing: Spacing
  breakpoints: { sm: string; md: string; lg: string; xl: string; xxl: string }
  zIndex: {
    dropdown: number
    sticky: number
    fixed: number
    offcanvasBackdrop: number
    offcanvas: number
    modalBackdrop: number
    modal: number
    popover: number
    tooltip: number
    toast: number
  }
  focusRing: { width: string; opacity: string; color: string }
  transition: { base: string; fade: string; collapse: string; collapseWidth: string }
  font: {
    sansSerif: string
    monospace: string
    size: { base: string; sm: string; lg: string }
    weight: {
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
    }
    lineHeight: { base: string; sm: string; lg: string }
    headings: {
      color: string
      fontWeight: number
      lineHeight: string
      sizes: { h1: string; h2: string; h3: string; h4: string; h5: string; h6: string }
    }
  }
  /** Values that override under `[data-bs-theme=dark]`. */
  dark: ColorModeTokens
}

/** Recursive partial for createTheme overrides. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
