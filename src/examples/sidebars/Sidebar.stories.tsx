import type { Story } from '@ladle/react'
import { Sidebar } from './Sidebar'

export default { title: 'Examples / Sidebars' }

/**
 * The Bootstrap `/examples/sidebars` fixed vertical sidebar, built from
 * bootstrap-styled components (Box · Nav · ListGroup · BsIcon). Rendered under
 * Ladle's global Provider.
 */
export const SidebarExample: Story = () => <Sidebar />
SidebarExample.storyName = 'Sidebar'
