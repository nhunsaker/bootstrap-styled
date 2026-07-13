import type { Story } from '@ladle/react'
import { Navbars } from './Navbars'

export default { title: 'Examples / Navbars' }

/**
 * The Bootstrap `/examples/navbars` set, built from bootstrap-styled components.
 * Rendered under Ladle's global Provider (tokens + Reboot). View at ≥992px for
 * the expanded desktop layout.
 */
export const NavbarsExample: Story = () => <Navbars />
NavbarsExample.storyName = 'Navbars'
