import type { Story } from '@ladle/react'
import { Spinner, Stack } from '../../src'

export default { title: 'Core/Spinner' }

export const Colors: Story = () => (
  <Stack direction="horizontal" gap={3}>
    {(['primary','secondary','success','danger','warning','info'] as const).map(v => (
      <Spinner key={v} variant={v} aria-label={v} />
    ))}
  </Stack>
)

export const Sizes: Story = () => (
  <Stack direction="horizontal" gap={3} style={{ alignItems: 'center' }}>
    <Spinner size="sm" />
    <Spinner />
  </Stack>
)
