import type { Story } from '@ladle/react'
import { VisuallyHidden } from './VisuallyHidden'

export default { title: 'Helpers/VisuallyHidden' }

export const Basic: Story = () => (
  <button type="button">
    <span aria-hidden="true">★</span>
    <VisuallyHidden>Add to favorites</VisuallyHidden>
  </button>
)

export const Focusable: Story = () => (
  <VisuallyHidden as="a" href="#main" focusable>
    Skip to main content (Tab to reveal)
  </VisuallyHidden>
)
