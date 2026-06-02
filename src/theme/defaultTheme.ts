import type { Theme } from './types'

// Bootstrap 5.3 default values.
export const defaultTheme: Theme = {
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529',
  },
  body: { bg: '#ffffff', color: '#212529' },
  border: { color: '#dee2e6' },
  radius: { sm: '0.25rem', base: '0.375rem', lg: '0.5rem', pill: '50rem' },
  spacing: ['0', '0.25rem', '0.5rem', '1rem', '1.5rem', '3rem'],
  font: {
    sansSerif:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    size: { base: '1rem', sm: '0.875rem', lg: '1.25rem' },
    weight: { normal: 400, semibold: 600, bold: 700 },
  },
}

// Minimal dark-mode overrides (data-bs-theme="dark").
export const darkOverrides = {
  body: { bg: '#212529', color: '#dee2e6' },
  border: { color: '#495057' },
}
