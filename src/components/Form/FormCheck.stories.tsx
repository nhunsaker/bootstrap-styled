import type { Story } from '@ladle/react'
import { FormCheck } from './FormCheck'

export default { title: 'Forms/FormCheck' }

export const Checkbox: Story = () => (
  <div>
    <FormCheck id="ck1" label="Default checkbox" defaultChecked />
    <FormCheck id="ck2" label="Unchecked checkbox" />
    <FormCheck id="ck3" label="Disabled checkbox" disabled />
  </div>
)

export const Radio: Story = () => (
  <div>
    <FormCheck type="radio" name="r" id="r1" label="Default radio" defaultChecked />
    <FormCheck type="radio" name="r" id="r2" label="Second radio" />
    <FormCheck type="radio" name="r" id="r3" label="Disabled radio" disabled />
  </div>
)

export const Switch: Story = () => (
  <div>
    <FormCheck type="switch" id="s1" label="Default switch" />
    <FormCheck type="switch" id="s2" label="Checked switch" defaultChecked />
    <FormCheck type="switch" id="s3" label="Disabled switch" disabled />
  </div>
)

export const Inline: Story = () => (
  <div>
    <FormCheck inline type="radio" name="i" id="i1" label="One" defaultChecked />
    <FormCheck inline type="radio" name="i" id="i2" label="Two" />
    <FormCheck inline type="radio" name="i" id="i3" label="Three" />
  </div>
)

export const Reverse: Story = () => (
  <div style={{ maxWidth: 240 }}>
    <FormCheck reverse id="rev1" label="Reverse checkbox" />
    <FormCheck reverse type="switch" id="rev2" label="Reverse switch" defaultChecked />
  </div>
)

export const ButtonStyle: Story = () => (
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <FormCheck button type="checkbox" id="b1" label="Checkbox toggle" defaultChecked />
    <FormCheck button type="radio" name="bg" id="b2" label="Radio A" defaultChecked />
    <FormCheck button type="radio" name="bg" id="b3" label="Radio B" />
    <FormCheck button buttonVariant="primary" id="b4" label="Solid toggle" />
  </div>
)

export const Validation: Story = () => (
  <div>
    <FormCheck id="v1" label="Valid checkbox" isValid defaultChecked />
    <FormCheck id="v2" label="Invalid checkbox" isInvalid />
  </div>
)
