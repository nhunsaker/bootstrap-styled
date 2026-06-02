import { describe, it, expect } from 'vitest'
import { colorContrast } from './color'

describe('colorContrast (YIQ)', () => {
  // Regression: an sRGB-luminance threshold returned black for primary #0d6efd.
  // YIQ must match Bootstrap's button text choices across all theme colors.
  it('matches Bootstrap default button text per color', () => {
    expect(colorContrast('#0d6efd')).toBe('#fff') // primary
    expect(colorContrast('#6c757d')).toBe('#fff') // secondary
    expect(colorContrast('#198754')).toBe('#fff') // success
    expect(colorContrast('#dc3545')).toBe('#fff') // danger
    expect(colorContrast('#ffc107')).toBe('#000') // warning
    expect(colorContrast('#0dcaf0')).toBe('#000') // info
    expect(colorContrast('#f8f9fa')).toBe('#000') // light
    expect(colorContrast('#212529')).toBe('#fff') // dark
  })

  it('handles shorthand hex and bare black/white', () => {
    expect(colorContrast('#fff')).toBe('#000')
    expect(colorContrast('#000')).toBe('#fff')
  })

  it('falls back to white on non-hex input', () => {
    expect(colorContrast('rebeccapurple')).toBe('#fff')
    expect(colorContrast('')).toBe('#fff')
  })
})
