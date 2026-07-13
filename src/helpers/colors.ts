// Theme-color RGB triples + text-on-color contrast, transcribed verbatim from
// parity/oracle/bootstrap.min.css (Bootstrap 5.3.8 `:root` custom properties and
// the `.text-bg-*` rules). Inlined here so the color/background & focus-ring
// helpers render self-contained, without depending on Bootstrap's utility CSS.

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

export const THEME_COLORS: ThemeColor[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark',
]

// `--bs-{color}-rgb` values from the oracle `:root` block.
export const THEME_COLOR_RGB: Record<ThemeColor, string> = {
  primary: '13,110,253',
  secondary: '108,117,125',
  success: '25,135,84',
  info: '13,202,240',
  warning: '255,193,7',
  danger: '220,53,69',
  light: '248,249,250',
  dark: '33,37,41',
}

// The `color:` value each `.text-bg-{color}` rule sets in the oracle.
export const TEXT_BG_CONTRAST: Record<ThemeColor, string> = {
  primary: '#fff',
  secondary: '#fff',
  success: '#fff',
  info: '#000',
  warning: '#000',
  danger: '#fff',
  light: '#000',
  dark: '#fff',
}
