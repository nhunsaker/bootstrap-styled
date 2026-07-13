import type { Story } from '@ladle/react'
import { ButtonGroup, ButtonToolbar } from './ButtonGroup'
import { Button } from '../Button'

export default { title: 'Components/ButtonGroup' }

export const Basic: Story = () => (
  <ButtonGroup aria-label="Basic example">
    <Button variant="primary">Left</Button>
    <Button variant="primary">Middle</Button>
    <Button variant="primary">Right</Button>
  </ButtonGroup>
)

export const Outlined: Story = () => (
  <ButtonGroup aria-label="Outlined example">
    <Button variant="outline-primary">Left</Button>
    <Button variant="outline-primary">Middle</Button>
    <Button variant="outline-primary">Right</Button>
  </ButtonGroup>
)

export const Sizes: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
    <ButtonGroup size="lg" aria-label="Large">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
    <ButtonGroup aria-label="Default">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
    <ButtonGroup size="sm" aria-label="Small">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  </div>
)

export const Vertical: Story = () => (
  <ButtonGroup vertical aria-label="Vertical example">
    <Button variant="primary">Top</Button>
    <Button variant="primary">Middle</Button>
    <Button variant="primary">Bottom</Button>
  </ButtonGroup>
)

export const Toolbar: Story = () => (
  <ButtonToolbar aria-label="Toolbar with button groups" style={{ gap: '0.5rem' }}>
    <ButtonGroup aria-label="First group">
      <Button variant="primary">1</Button>
      <Button variant="primary">2</Button>
      <Button variant="primary">3</Button>
    </ButtonGroup>
    <ButtonGroup aria-label="Second group">
      <Button variant="secondary">4</Button>
      <Button variant="secondary">5</Button>
    </ButtonGroup>
  </ButtonToolbar>
)
