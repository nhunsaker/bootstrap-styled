import type { Story } from '@ladle/react'
import { StretchedLink } from './StretchedLink'

export default { title: 'Helpers/StretchedLink' }

export const Card: Story = () => (
  <div
    style={{
      position: 'relative',
      maxWidth: 260,
      border: '1px solid #dee2e6',
      borderRadius: '0.375rem',
      padding: '1rem',
    }}
  >
    <h5 style={{ margin: '0 0 0.5rem' }}>Card title</h5>
    <p style={{ margin: 0 }}>The whole card is clickable via the stretched link.</p>
    <StretchedLink href="#">Go somewhere</StretchedLink>
  </div>
)
