import type { Story } from '@ladle/react'
import { FormFeedback } from './FormFeedback'
import { FormControl } from './FormControl'
import { FormLabel } from './FormParts'

export default { title: 'Forms/Validation Feedback' }

// The feedback is display:none until a preceding sibling carries `.is-valid` /
// `.is-invalid` (engineer A emits that class on the control). We add the class
// explicitly here to demonstrate the sibling-trigger CSS.

export const Invalid: Story = () => (
  <div style={{ maxWidth: 480 }}>
    <FormLabel>Username</FormLabel>
    <FormControl isInvalid className="is-invalid" defaultValue="nope" />
    <FormFeedback type="invalid">Please choose a valid username.</FormFeedback>
  </div>
)

export const Valid: Story = () => (
  <div style={{ maxWidth: 480 }}>
    <FormLabel>Username</FormLabel>
    <FormControl isValid className="is-valid" defaultValue="taken@ok" />
    <FormFeedback type="valid">Looks good!</FormFeedback>
  </div>
)

export const Tooltip: Story = () => (
  <div style={{ maxWidth: 480, display: 'grid', gap: '2.5rem' }}>
    <div style={{ position: 'relative' }}>
      <FormControl isInvalid className="is-invalid" defaultValue="bad" />
      <FormFeedback type="invalid" tooltip>
        Looks like there is a problem.
      </FormFeedback>
    </div>
    <div style={{ position: 'relative' }}>
      <FormControl isValid className="is-valid" defaultValue="good" />
      <FormFeedback type="valid" tooltip>
        Looks good!
      </FormFeedback>
    </div>
  </div>
)

// Inside `.was-validated`, native `:valid` / `:invalid` drive the display with
// no explicit class needed.
export const WasValidated: Story = () => (
  <form className="was-validated" style={{ maxWidth: 480 }} noValidate>
    <FormLabel>Required field</FormLabel>
    <FormControl type="text" required defaultValue="" />
    <FormFeedback type="invalid">This field is required.</FormFeedback>
  </form>
)
