import type { Story } from '@ladle/react'
import { Footers } from './Footers'

export default { title: 'Examples / Footers' }

/**
 * The Bootstrap `/examples/footers` layout — link columns + a bottom bar with
 * copyright and social icons — built from bootstrap-styled components. Rendered
 * under Ladle's global Provider.
 */
export const FootersExample: Story = () => <Footers />
FootersExample.storyName = 'Footers'
