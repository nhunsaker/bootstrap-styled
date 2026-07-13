import type { Story } from '@ladle/react'
// See Headers.stories.tsx for why Bootstrap's compiled CSS is loaded here.
import 'bootstrap/dist/css/bootstrap.min.css'
import { Features } from './Features'
import { FeaturesNative } from './Features.native'

export default { title: 'Examples/Features' }

/** The bootstrap-styled feature grid, composed from Container/Row/Col · Heading · Box · Icon. */
export const Styled: Story = () => <Features />

/** The raw Bootstrap markup twin (oracle side) — should be indistinguishable. */
export const Native: Story = () => <FeaturesNative />

/** Side-by-side parity view: styled (top) vs native (bottom). */
export const Comparison: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        bootstrap-styled
      </div>
      <Features />
    </div>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        native Bootstrap
      </div>
      <FeaturesNative />
    </div>
  </div>
)
