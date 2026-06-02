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
  border: { color: '#dee2e6', radius: '0.375rem' },
  font: {
    sansSerif:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    size: '1rem',
  },
}

// Minimal dark-mode overrides (data-bs-theme="dark"). Concrete shape so the
// GlobalStyles layer can read each field without optional-chaining.
export const darkOverrides = {
  body: { bg: '#212529', color: '#dee2e6' },
  border: { color: '#495057' },
}
