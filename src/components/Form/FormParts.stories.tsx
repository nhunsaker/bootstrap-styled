import type { Story } from '@ladle/react'
import { FormRow, FormCol, ColFormLabel, FormLabel, FormText, FormGroup } from './FormParts'
import { FormControl } from './FormControl'

export default { title: 'Forms/Layout' }

export const HorizontalForm: Story = () => (
  <div style={{ maxWidth: 640 }}>
    <FormRow align="center" style={{ marginBottom: '1rem' }}>
      <ColFormLabel sm={2} htmlFor="hf-email">
        Email
      </ColFormLabel>
      <FormCol sm={10}>
        <FormControl id="hf-email" type="email" placeholder="name@example.com" />
      </FormCol>
    </FormRow>
    <FormRow align="center">
      <ColFormLabel sm={2} htmlFor="hf-pw">
        Password
      </ColFormLabel>
      <FormCol sm={10}>
        <FormControl id="hf-pw" type="password" />
      </FormCol>
    </FormRow>
  </div>
)

export const HorizontalSizes: Story = () => (
  <div style={{ maxWidth: 640, display: 'grid', gap: '1rem' }}>
    <FormRow align="center">
      <ColFormLabel size="sm" sm={2}>
        Small
      </ColFormLabel>
      <FormCol sm={10}>
        <FormControl size="sm" type="text" placeholder="sm" />
      </FormCol>
    </FormRow>
    <FormRow align="center">
      <ColFormLabel sm={2}>Default</ColFormLabel>
      <FormCol sm={10}>
        <FormControl type="text" placeholder="default" />
      </FormCol>
    </FormRow>
    <FormRow align="center">
      <ColFormLabel size="lg" sm={2}>
        Large
      </ColFormLabel>
      <FormCol sm={10}>
        <FormControl size="lg" type="text" placeholder="lg" />
      </FormCol>
    </FormRow>
  </div>
)

export const GridGutters: Story = () => (
  <div style={{ maxWidth: 640, display: 'grid', gap: '1.5rem' }}>
    {([0, 3, 5] as const).map((g) => (
      <FormRow key={g} gx={g}>
        <FormCol>
          <FormControl placeholder={`First (gx-${g})`} />
        </FormCol>
        <FormCol>
          <FormControl placeholder={`Last (gx-${g})`} />
        </FormCol>
      </FormRow>
    ))}
  </div>
)

export const VerticalGroup: Story = () => (
  <div style={{ maxWidth: 480 }}>
    <FormGroup>
      <FormLabel htmlFor="vg-email">Email address</FormLabel>
      <FormControl id="vg-email" type="email" placeholder="name@example.com" />
      <FormText>We'll never share your email with anyone else.</FormText>
    </FormGroup>
  </div>
)
