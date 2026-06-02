import type { Story } from '@ladle/react'
import { Alert, Stack } from '../../src'

export default { title: 'Core/Alert' }

export const Variants: Story = () => (
  <Stack gap={2}>
    {(['primary','secondary','success','danger','warning','info','light','dark'] as const).map(v => (
      <Alert key={v} variant={v}>This is a <strong>{v}</strong> alert.</Alert>
    ))}
  </Stack>
)
