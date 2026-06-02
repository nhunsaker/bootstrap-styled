// Bootstrap 5 theme contract. Values are plain CSS color/length strings; the
// GlobalStyles layer projects them onto Bootstrap's `--bs-*` custom properties,
// and components read those vars — so runtime overrides (color modes, or a
// Figtree preview) cascade without re-rendering.

export type ColorName =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

export interface Theme {
  colors: Record<ColorName, string>
  body: { bg: string; color: string }
  border: { color: string; radius: string }
  font: { sansSerif: string; size: string }
}

/** Recursive partial for createTheme overrides. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
