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
 * Pick black or white for legible text on a background color, using sRGB
 * relative luminance and Bootstrap's 0.179 threshold. Non-hex inputs fall
 * back to white. Returns '#000' or '#fff'.
 */
export function colorContrast(background: string): string {
  const rgb = hexToRgb(background)
  if (!rgb) return '#fff'
  const lin = [rgb.r, rgb.g, rgb.b].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  const L = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
  return L > 0.179 ? '#000' : '#fff'
}
