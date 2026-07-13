import type { Story } from '@ladle/react'
// See Headers.stories.tsx for why Bootstrap's compiled CSS is loaded here.
import 'bootstrap/dist/css/bootstrap.min.css'
import { Heroes } from './Heroes'
import { HeroesNative } from './Heroes.native'

export default { title: 'Examples/Heroes' }

/** The bootstrap-styled hero, composed from Display · Lead · Button · Icon · Box. */
export const Styled: Story = () => <Heroes />

/** The raw Bootstrap markup twin (oracle side) — should be indistinguishable. */
export const Native: Story = () => <HeroesNative />

/** Side-by-side parity view: styled (top) vs native (bottom). */
export const Comparison: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        bootstrap-styled
      </div>
      <Heroes />
    </div>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        native Bootstrap
      </div>
      <HeroesNative />
    </div>
  </div>
)
