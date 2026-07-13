import type { Story } from '@ladle/react'
import { TextBg } from './TextBg'
import { THEME_COLORS } from './colors'

export default { title: 'Helpers/TextBg' }

export const AllColors: Story = () => (
  <div style={{ display: 'grid', gap: '0.5rem', maxWidth: 320 }}>
    {THEME_COLORS.map((c) => (
      <TextBg key={c} color={c} style={{ padding: '0.5rem 0.75rem', borderRadius: '0.375rem' }}>
        .text-bg-{c}
      </TextBg>
    ))}
  </div>
)

export const AsBadge: Story = () => (
  <TextBg
    as="span"
    color="success"
    style={{ padding: '0.35em 0.65em', borderRadius: '0.375rem', fontSize: '0.75em' }}
  >
    New
  </TextBg>
)
