import type { Story } from '@ladle/react'
import { FormControl, FormSelect, FormCheck, FormLabel, FormGroup, FormText, InputGroup, InputGroupText, Button, Stack } from '../../src'

export default { title: 'Forms/FormControl' }

export const Inputs: Story = () => (
  <Stack gap={3} style={{ maxWidth: 480 }}>
    <FormGroup>
      <FormLabel>Email address</FormLabel>
      <FormControl type="email" placeholder="name@example.com" />
      <FormText>We'll never share your email with anyone else.</FormText>
    </FormGroup>
    <FormGroup>
      <FormLabel>Password</FormLabel>
      <FormControl type="password" placeholder="Password" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Textarea</FormLabel>
      <FormControl as="textarea" rows={3} placeholder="Message..." />
    </FormGroup>
  </Stack>
)

export const Validation: Story = () => (
  <Stack gap={2} style={{ maxWidth: 480 }}>
    <FormControl placeholder="Valid input" isValid />
    <FormControl placeholder="Invalid input" isInvalid />
  </Stack>
)

export const Sizes: Story = () => (
  <Stack gap={2} style={{ maxWidth: 480 }}>
    <FormControl size="sm" placeholder="Small" />
    <FormControl placeholder="Default" />
    <FormControl size="lg" placeholder="Large" />
  </Stack>
)

export const Select: Story = () => (
  <Stack gap={2} style={{ maxWidth: 480 }}>
    <FormGroup>
      <FormLabel>Select plan</FormLabel>
      <FormSelect>
        <option value="" disabled>Choose...</option>
        <option>Free</option>
        <option>Team</option>
        <option>Enterprise</option>
      </FormSelect>
    </FormGroup>
  </Stack>
)

export const Checks: Story = () => (
  <Stack gap={2}>
    <FormCheck id="cb1" label="Checkbox (checked)" defaultChecked />
    <FormCheck id="cb2" label="Checkbox" />
    <FormCheck id="r1" type="radio" name="group" label="Radio option A" defaultChecked />
    <FormCheck id="r2" type="radio" name="group" label="Radio option B" />
    <FormCheck id="sw1" type="switch" label="Switch (on)" defaultChecked />
    <FormCheck id="sw2" type="switch" label="Switch (off)" />
  </Stack>
)

export const InputGroups: Story = () => (
  <Stack gap={2} style={{ maxWidth: 480 }}>
    <InputGroup>
      <InputGroupText>@</InputGroupText>
      <FormControl placeholder="Username" />
    </InputGroup>
    <InputGroup>
      <FormControl placeholder="Search..." />
      <Button variant="primary">Go</Button>
    </InputGroup>
  </Stack>
)
