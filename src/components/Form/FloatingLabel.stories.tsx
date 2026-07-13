import type { Story } from '@ladle/react'
import { FloatingLabel } from './FloatingLabel'
import { FormControl } from './FormControl'
import { FormSelect } from './FormSelect'

export default { title: 'Forms/FloatingLabel' }

export const Input: Story = () => (
  <div style={{ maxWidth: 480, display: 'grid', gap: '1rem' }}>
    <FloatingLabel label="Email address">
      <FormControl type="email" />
    </FloatingLabel>
    <FloatingLabel label="Password">
      <FormControl type="password" />
    </FloatingLabel>
    <FloatingLabel label="Pre-filled value">
      <FormControl type="text" defaultValue="hello@example.com" />
    </FloatingLabel>
  </div>
)

export const Select: Story = () => (
  <div style={{ maxWidth: 480 }}>
    <FloatingLabel label="Works with selects">
      <FormSelect defaultValue="1">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </FormSelect>
    </FloatingLabel>
  </div>
)

export const Textarea: Story = () => (
  <div style={{ maxWidth: 480 }}>
    <FloatingLabel label="Comments">
      <FormControl as="textarea" style={{ height: 100 }} />
    </FloatingLabel>
  </div>
)

export const Disabled: Story = () => (
  <div style={{ maxWidth: 480 }}>
    <FloatingLabel label="Disabled input">
      <FormControl type="text" disabled />
    </FloatingLabel>
  </div>
)
