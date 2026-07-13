import type { Story } from '@ladle/react'
import { Image } from './Image'

export default { title: 'Content/Image' }

// A tiny inline SVG data-URI so stories render without network access.
const SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="240" height="160" fill="#6c757d"/><text x="120" y="85" font-size="20" fill="#fff" text-anchor="middle">240x160</text></svg>`,
  )

export const Fluid: Story = () => <Image fluid src={SRC} alt="fluid example" />

export const Thumbnail: Story = () => <Image thumbnail src={SRC} alt="thumbnail example" />

export const Rounded: Story = () => <Image rounded src={SRC} alt="rounded example" />
