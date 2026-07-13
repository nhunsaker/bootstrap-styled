import type { Story } from '@ladle/react'
import { FocusRing } from './FocusRing'
import { THEME_COLORS } from './colors'

export default { title: 'Helpers/FocusRing' }

const linkStyle = {
  display: 'inline-block',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.375rem',
  border: '1px solid #dee2e6',
  textDecoration: 'none',
  color: '#212529',
} as const

export const Default: Story = () => (
  <FocusRing as="a" href="#" style={linkStyle}>
    Focus me (Tab)
  </FocusRing>
)

export const Colored: Story = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
    {THEME_COLORS.map((c) => (
      <FocusRing key={c} as="a" href="#" color={c} style={linkStyle}>
        {c}
      </FocusRing>
    ))}
  </div>
)
