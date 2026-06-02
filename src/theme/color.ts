// Color helpers. Contrast is computed in JS (no portable pure-CSS luminance);
// hover/active shading is done at runtime in CSS via color-mix() so it tracks
// live overrides of the base --bs-* var.

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

/**
 * Pick black or white for legible text on a background color, using the YIQ
 * perceived-brightness formula with a 128 threshold. This matches Bootstrap's
 * default button text choices across all theme colors (e.g. white on primary
 * #0d6efd, black on warning #ffc107). Non-hex inputs fall back to white.
 * Returns '#000' or '#fff'.
 */
export function colorContrast(background: string): string {
  const rgb = hexToRgb(background)
  if (!rgb) return '#fff'
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return yiq >= 128 ? '#000' : '#fff'
}
