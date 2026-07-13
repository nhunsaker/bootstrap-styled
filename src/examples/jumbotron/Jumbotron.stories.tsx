import type { Story } from '@ladle/react'
// Example pages compose Bootstrap layout/utility CLASSES (via <Box>, `.lead`,
// `.display-4`, `.my-4`…) whose CSS the library does not ship in GlobalStyles
// (per the Box contract — utilities are the host app's to provide). We load
// Bootstrap's compiled utilities here so the showcase renders fully in Ladle;
// the parity harness supplies the same via its vendored oracle CSS.
import 'bootstrap/dist/css/bootstrap.min.css'
import { Jumbotron } from './Jumbotron'
import { JumbotronNative } from './Jumbotron.native'

export default { title: 'Examples/Jumbotron' }

/** The bootstrap-styled hero, composed from Box · Typography · Button. */
export const Styled: Story = () => <Jumbotron />

/** The raw Bootstrap markup twin (oracle side) — should be indistinguishable. */
export const Native: Story = () => <JumbotronNative />

/** Side-by-side parity view: styled (top) vs native (bottom). */
export const Comparison: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        bootstrap-styled
      </div>
      <Jumbotron />
    </div>
    <div>
      <div style={{ font: '600 0.75rem system-ui', opacity: 0.6, marginBottom: 4 }}>
        native Bootstrap
      </div>
      <JumbotronNative />
    </div>
  </div>
)
