// Bootstrap 5 theme contract. Values are plain CSS color/length strings; the
// GlobalStyles layer projects them onto Bootstrap's `--bs-*` custom properties
// (incl. computed `--bs-<color>-contrast`), and components read those vars — so
// runtime overrides (color modes, or a Figtree preview) cascade.

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

export interface Theme {
  colors: Record<ColorName, string>
  body: { bg: string; color: string }
  border: { color: string }
  radius: { sm: string; base: string; lg: string; pill: string }
  spacing: Spacing
  font: {
    sansSerif: string
    size: { base: string; sm: string; lg: string }
    weight: { normal: number; semibold: number; bold: number }
  }
}

/** Recursive partial for createTheme overrides. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
