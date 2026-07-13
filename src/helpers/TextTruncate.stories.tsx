import type { Story } from '@ladle/react'
import { TextTruncate } from './TextTruncate'

export default { title: 'Helpers/TextTruncate' }

export const Basic: Story = () => (
  <TextTruncate style={{ maxWidth: 200, border: '1px solid #dee2e6', padding: '0.25rem' }}>
    This is a very long line of text that will be truncated with an ellipsis.
  </TextTruncate>
)
