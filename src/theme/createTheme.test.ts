import { describe, it, expect } from 'vitest'
import { createTheme } from './createTheme'
import { defaultTheme } from './defaultTheme'

describe('createTheme', () => {
  it('returns the defaults with no overrides', () => {
    expect(createTheme().colors.primary).toBe(defaultTheme.colors.primary)
  })

  it('deep-merges overrides without dropping siblings', () => {
    const t = createTheme({ colors: { primary: '#7c3aed' } })
    expect(t.colors.primary).toBe('#7c3aed')
    expect(t.colors.danger).toBe(defaultTheme.colors.danger)
    expect(t.radius.base).toBe(defaultTheme.radius.base)
    expect(t.font.size.base).toBe(defaultTheme.font.size.base)
  })

  it('does not mutate the default theme', () => {
    createTheme({ colors: { primary: '#000000' } })
    expect(defaultTheme.colors.primary).toBe('#0d6efd')
  })
})
