import type { Story } from '@ladle/react'
import { Progress, ProgressBar, Stack } from '../../src'

export default { title: 'Core/Progress' }

export const Basic: Story = () => (
  <Stack gap={2}>
    <Progress><ProgressBar now={25} /></Progress>
    <Progress><ProgressBar now={50} variant="success" /></Progress>
    <Progress><ProgressBar now={75} variant="warning" /></Progress>
    <Progress><ProgressBar now={100} variant="danger" /></Progress>
  </Stack>
)

export const Sizes: Story = () => (
  <Stack gap={2}>
    <Progress><ProgressBar now={33} /></Progress>
    <Progress style={{ height: 4 }}><ProgressBar now={66} variant="info" /></Progress>
    <Progress style={{ height: 20 }}><ProgressBar now={80} variant="success" /></Progress>
  </Stack>
)
