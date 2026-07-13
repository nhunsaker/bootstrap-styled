import type { Story } from '@ladle/react'
import { IconLink } from './IconLink'

export default { title: 'Helpers/IconLink' }

// A minimal inline SVG carrying the `.bi` class — the slot IconLink styles.
// (IconLink intentionally does not import the Icon component.)
const ArrowIcon = () => (
  <svg className="bi" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
  </svg>
)

export const Basic: Story = () => (
  <IconLink href="#">
    Icon link
    <ArrowIcon />
  </IconLink>
)

export const Hover: Story = () => (
  <IconLink href="#" hover>
    Hover me
    <ArrowIcon />
  </IconLink>
)
