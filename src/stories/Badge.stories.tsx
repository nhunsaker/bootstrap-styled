import type { Story } from '@ladle/react'
import { Badge, Stack } from '../../src'

export default { title: 'Core/Badge' }

export const Variants: Story = () => (
  <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
    {(['primary','secondary','success','danger','warning','info','light','dark'] as const).map(v => (
      <Badge key={v} variant={v}>{v}</Badge>
    ))}
  </Stack>
)

export const Pill: Story = () => (
  <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
    {(['primary','secondary','success','danger'] as const).map(v => (
      <Badge key={v} variant={v} pill>{v}</Badge>
    ))}
  </Stack>
)
