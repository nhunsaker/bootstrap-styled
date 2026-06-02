import type { Story } from '@ladle/react'
import { Button, Stack } from '../../src'

export default { title: 'Core/Button' }

export const Variants: Story = () => (
  <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
    {(['primary','secondary','success','danger','warning','info','light','dark'] as const).map(v => (
      <Button key={v} variant={v}>{v}</Button>
    ))}
  </Stack>
)

export const Outline: Story = () => (
  <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
    {(['primary','secondary','success','danger','warning','info','light','dark'] as const).map(v => (
      <Button key={v} variant={`outline-${v}`}>{v}</Button>
    ))}
  </Stack>
)

export const Sizes: Story = () => (
  <Stack direction="horizontal" gap={2} style={{ alignItems: 'center' }}>
    <Button variant="primary" size="sm">Small</Button>
    <Button variant="primary">Default</Button>
    <Button variant="primary" size="lg">Large</Button>
  </Stack>
)

export const States: Story = () => (
  <Stack direction="horizontal" gap={2}>
    <Button variant="primary">Default</Button>
    <Button variant="primary" disabled>Disabled</Button>
    <Button variant="primary" as="a" href="#">As link</Button>
  </Stack>
)
