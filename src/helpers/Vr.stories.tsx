import type { Story } from '@ladle/react'
import { Vr } from './Vr'

export default { title: 'Helpers/Vr' }

export const Basic: Story = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40 }}>
    <span>Left</span>
    <Vr />
    <span>Middle</span>
    <Vr />
    <span>Right</span>
  </div>
)
