import type { Theme, ColorName, ColorTokenSet, ColorModeTokens } from './types'

// ---------------------------------------------------------------------------
// Bootstrap 5.3.8 default values — verified against the vendored oracle
// (parity/oracle/bootstrap.min.css, :root/[data-bs-theme] blocks).
// ---------------------------------------------------------------------------

const colors: Record<ColorName, string> = {
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  light: '#f8f9fa',
  dark: '#212529',
}

// `--bs-<color>-rgb` (used by text-bg-* / RGBA() alpha compositing).
const colorRgb: Record<ColorName, string> = {
  primary: '13,110,253',
  secondary: '108,117,125',
  success: '25,135,84',
  danger: '220,53,69',
  warning: '255,193,7',
  info: '13,202,240',
  light: '248,249,250',
  dark: '33,37,41',
}

// Light-mode -text-emphasis / -bg-subtle / -border-subtle per theme color.
const colorTokensLight: Record<ColorName, ColorTokenSet> = {
  primary: { emphasis: '#052c65', bgSubtle: '#cfe2ff', borderSubtle: '#9ec5fe' },
  secondary: { emphasis: '#2b2f32', bgSubtle: '#e2e3e5', borderSubtle: '#c4c8cb' },
  success: { emphasis: '#0a3622', bgSubtle: '#d1e7dd', borderSubtle: '#a3cfbb' },
  danger: { emphasis: '#58151c', bgSubtle: '#f8d7da', borderSubtle: '#f1aeb5' },
  warning: { emphasis: '#664d03', bgSubtle: '#fff3cd', borderSubtle: '#ffe69c' },
  info: { emphasis: '#055160', bgSubtle: '#cff4fc', borderSubtle: '#9eeaf9' },
  light: { emphasis: '#495057', bgSubtle: '#fcfcfd', borderSubtle: '#e9ecef' },
  dark: { emphasis: '#495057', bgSubtle: '#ced4da', borderSubtle: '#adb5bd' },
}

// Dark-mode ([data-bs-theme=dark]) -text-emphasis / -bg-subtle / -border-subtle.
const colorTokensDark: Record<ColorName, ColorTokenSet> = {
  primary: { emphasis: '#6ea8fe', bgSubtle: '#031633', borderSubtle: '#084298' },
  secondary: { emphasis: '#a7acb1', bgSubtle: '#161719', borderSubtle: '#41464b' },
  success: { emphasis: '#75b798', bgSubtle: '#051b11', borderSubtle: '#0f5132' },
  danger: { emphasis: '#ea868f', bgSubtle: '#2c0b0e', borderSubtle: '#842029' },
  warning: { emphasis: '#ffda6a', bgSubtle: '#332701', borderSubtle: '#997404' },
  info: { emphasis: '#6edff6', bgSubtle: '#032830', borderSubtle: '#087990' },
  light: { emphasis: '#f8f9fa', bgSubtle: '#343a40', borderSubtle: '#495057' },
  dark: { emphasis: '#dee2e6', bgSubtle: '#1a1d20', borderSubtle: '#343a40' },
}

// Values that flip under [data-bs-theme=dark].
const dark: ColorModeTokens = {
  body: { bg: '#212529', color: '#dee2e6', colorRgb: '222,226,230', bgRgb: '33,37,41' },
  emphasisColor: '#fff',
  secondary: { color: 'rgba(222, 226, 230, 0.75)', bg: '#343a40' },
  tertiary: { color: 'rgba(222, 226, 230, 0.5)', bg: '#2b3035' },
  border: { color: '#495057', translucent: 'rgba(255, 255, 255, 0.15)' },
  link: { color: '#6ea8fe', hoverColor: '#8bb9fe' },
  colorTokens: colorTokensDark,
}

export const defaultTheme: Theme = {
  colors,
  colorRgb,
  colorTokens: colorTokensLight,
  body: { bg: '#ffffff', color: '#212529', colorRgb: '33,37,41', bgRgb: '255,255,255' },
  emphasisColor: '#000',
  secondary: { color: 'rgba(33, 37, 41, 0.75)', bg: '#e9ecef' },
  tertiary: { color: 'rgba(33, 37, 41, 0.5)', bg: '#f8f9fa' },
  border: { color: '#dee2e6', translucent: 'rgba(0, 0, 0, 0.175)', width: '1px', style: 'solid' },
  link: { color: '#0d6efd', hoverColor: '#0a58ca' },
  radius: {
    sm: '0.25rem',
    base: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
    xxl: '2rem',
    pill: '50rem',
  },
  shadow: {
    sm: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    base: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    lg: '0 1rem 3rem rgba(0, 0, 0, 0.175)',
    inset: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',
  },
  spacing: ['0', '0.25rem', '0.5rem', '1rem', '1.5rem', '3rem'],
  breakpoints: { sm: '576px', md: '768px', lg: '992px', xl: '1200px', xxl: '1400px' },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    offcanvasBackdrop: 1040,
    offcanvas: 1045,
    modalBackdrop: 1050,
    modal: 1055,
    popover: 1070,
    tooltip: 1080,
    toast: 1090,
  },
  focusRing: { width: '0.25rem', opacity: '0.25', color: 'rgba(13, 110, 253, 0.25)' },
  transition: {
    base: 'all 0.2s ease-in-out',
    fade: 'opacity 0.15s linear',
    collapse: 'height 0.35s ease',
    collapseWidth: 'width 0.35s ease',
  },
  font: {
    sansSerif:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    monospace:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    size: { base: '1rem', sm: '0.875rem', lg: '1.25rem' },
    weight: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { base: '1.5', sm: '1.25', lg: '2' },
    headings: {
      color: 'inherit',
      fontWeight: 500,
      lineHeight: '1.2',
      sizes: { h1: '2.5rem', h2: '2rem', h3: '1.75rem', h4: '1.5rem', h5: '1.25rem', h6: '1rem' },
    },
  },
  dark,
}

// Back-compat: legacy shape consumed by GlobalStyles.tsx (body/border only).
export const darkOverrides = {
  body: { bg: dark.body.bg, color: dark.body.color },
  border: { color: dark.border.color },
}
