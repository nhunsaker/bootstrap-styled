import type { Story } from '@ladle/react'
import { FormControl } from './FormControl'
import { FormLabel, FormText } from './FormParts'

export default { title: 'Forms/FormControl' }

export const Basic: Story = () => (
  <div style={{ maxWidth: 360 }}>
    <FormLabel htmlFor="c-basic">Email address</FormLabel>
    <FormControl id="c-basic" type="email" placeholder="name@example.com" />
    <FormText>We'll never share your email.</FormText>
  </div>
)

export const Sizes: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 360 }}>
    <FormControl size="lg" placeholder="Large input" />
    <FormControl placeholder="Default input" />
    <FormControl size="sm" placeholder="Small input" />
  </div>
)

export const Textarea: Story = () => (
  <div style={{ maxWidth: 360 }}>
    <FormLabel htmlFor="c-ta">Message</FormLabel>
    <FormControl as="textarea" id="c-ta" rows={3} placeholder="Your message" />
  </div>
)

export const DisabledReadonly: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 360 }}>
    <FormControl placeholder="Disabled input" disabled />
    <FormControl defaultValue="Readonly value" readOnly />
    <FormControl plaintext defaultValue="Plaintext readonly" readOnly />
  </div>
)

export const FileAndColor: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 360 }}>
    <FormControl type="file" />
    <FormControl type="file" size="sm" />
    <FormControl type="color" defaultValue="#563d7c" title="Choose a color" />
  </div>
)

export const Validation: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 360 }}>
    <FormControl defaultValue="Looks good" isValid />
    <FormControl defaultValue="Please fix this" isInvalid />
    <FormControl as="textarea" rows={2} defaultValue="Valid textarea" isValid />
  </div>
)
