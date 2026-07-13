import type { Story } from '@ladle/react'
// See Jumbotron.stories for the rationale: example pages compose Bootstrap
// layout/utility CLASSES (Grid, `.d-flex`, `.gap-2`, `.mb-3`…) whose CSS the
// library does not ship in GlobalStyles. Load Bootstrap's compiled CSS so the
// showcase renders fully in Ladle; the parity harness supplies the same via its
// vendored oracle.
import 'bootstrap/dist/css/bootstrap.min.css'
import { KitchenSink } from './KitchenSink'
import { KitchenSinkNative } from './KitchenSink.native'

export default { title: 'Examples/KitchenSink' }

/** Everything on one page, built from bootstrap-styled components. */
export const Styled: Story = () => <KitchenSink />

/** The raw Bootstrap markup twin (oracle side). */
export const Native: Story = () => <KitchenSinkNative />
