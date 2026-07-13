import type { Story } from '@ladle/react'
import { FormSelect } from './FormSelect'

const options = (
  <>
    <option value="">Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </>
)

export default { title: 'Forms/FormSelect' }

export const Basic: Story = () => (
  <div style={{ maxWidth: 360 }}>
    <FormSelect defaultValue="">{options}</FormSelect>
  </div>
)

export const Sizes: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 360 }}>
    <FormSelect size="lg" defaultValue="">
      {options}
    </FormSelect>
    <FormSelect defaultValue="">{options}</FormSelect>
    <FormSelect size="sm" defaultValue="">
      {options}
    </FormSelect>
  </div>
)

export const Multiple: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 360 }}>
    <FormSelect multiple defaultValue={['1']}>
      {options}
    </FormSelect>
  </div>
)

export const Disabled: Story = () => (
  <div style={{ maxWidth: 360 }}>
    <FormSelect disabled defaultValue="">
      {options}
    </FormSelect>
  </div>
)

export const Validation: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 360 }}>
    <FormSelect isValid defaultValue="1">
      {options}
    </FormSelect>
    <FormSelect isInvalid defaultValue="">
      {options}
    </FormSelect>
  </div>
)
