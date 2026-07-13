import type { Story } from '@ladle/react'
import { Figure, FigureImage, FigureCaption } from './Figure'

export default { title: 'Content/Figure' }

const SRC =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#6c757d"/><text x="200" y="160" font-size="28" fill="#fff" text-anchor="middle">400x300</text></svg>`,
  )

export const Basic: Story = () => (
  <Figure>
    <FigureImage src={SRC} alt="figure example" style={{ maxWidth: '100%', height: 'auto' }} />
    <FigureCaption>A caption for the above image.</FigureCaption>
  </Figure>
)
