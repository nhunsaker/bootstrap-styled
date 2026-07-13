import type { Story } from '@ladle/react'
import { FormRange } from './FormRange'
import { FormLabel } from './FormParts'

export default { title: 'Forms/FormRange' }

export const Basic: Story = () => (
  <div style={{ maxWidth: 360 }}>
    <FormLabel htmlFor="range1">Example range</FormLabel>
    <FormRange id="range1" defaultValue={50} />
  </div>
)

export const MinMaxStep: Story = () => (
  <div style={{ maxWidth: 360 }}>
    <FormLabel htmlFor="range2">Steps of 5 (0–100)</FormLabel>
    <FormRange id="range2" min={0} max={100} step={5} defaultValue={25} />
  </div>
)

export const Disabled: Story = () => (
  <div style={{ maxWidth: 360 }}>
    <FormLabel htmlFor="range3">Disabled range</FormLabel>
    <FormRange id="range3" defaultValue={50} disabled />
  </div>
)
