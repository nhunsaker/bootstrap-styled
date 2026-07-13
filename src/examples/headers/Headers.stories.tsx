import type { Story } from '@ladle/react'
// Example pages compose Bootstrap layout/utility CLASSES (via <Box>, `.nav-pills`,
// `.col-*`, spacing, borders) whose CSS the library does not ship in GlobalStyles
// (per the Box contract — utilities are the host app's to provide). We load
// Bootstrap's compiled CSS here so the showcase renders fully in Ladle; the
// parity harness supplies the same via its vendored oracle CSS.
import 'bootstrap/dist/css/bootstrap.min.css'
import { Headers } from './Headers'
import { HeadersNative } from './Headers.native'

export default { title: 'Examples/Headers' }

/** The bootstrap-styled header, composed from Container · Nav · Button · Icon · Box. */
export const Styled: Story = () => <Headers />

/** The raw Bootstrap markup twin (oracle side) — should be indistinguishable. */
export const Native: Story = () => <HeadersNative />

/** Side-by-side parity view: styled (top) vs native (bottom). */
export const Comparison: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        bootstrap-styled
      </div>
      <Headers />
    </div>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        native Bootstrap
      </div>
      <HeadersNative />
    </div>
  </div>
)
