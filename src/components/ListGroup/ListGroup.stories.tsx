import type { Story } from '@ladle/react'
import { ListGroup, ListGroupItem } from './ListGroup'

export default { title: 'Components/ListGroup' }

const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const

export const Basic: Story = () => (
  <ListGroup style={{ maxWidth: 400 }}>
    <ListGroupItem active>An active item</ListGroupItem>
    <ListGroupItem>A second item</ListGroupItem>
    <ListGroupItem>A third item</ListGroupItem>
    <ListGroupItem disabled>A disabled item</ListGroupItem>
  </ListGroup>
)

export const Actionable: Story = () => (
  <ListGroup as="div" style={{ maxWidth: 400 }}>
    <ListGroupItem as="a" href="#" action active>
      The current link item
    </ListGroupItem>
    <ListGroupItem as="a" href="#" action>
      A second link item
    </ListGroupItem>
    <ListGroupItem as="a" href="#" action>
      A third link item
    </ListGroupItem>
    <ListGroupItem as="a" action disabled>
      A disabled link item
    </ListGroupItem>
  </ListGroup>
)

export const Flush: Story = () => (
  <ListGroup flush style={{ maxWidth: 400 }}>
    <ListGroupItem>An item</ListGroupItem>
    <ListGroupItem>A second item</ListGroupItem>
    <ListGroupItem>A third item</ListGroupItem>
  </ListGroup>
)

export const Numbered: Story = () => (
  <ListGroup numbered style={{ maxWidth: 400 }}>
    <ListGroupItem>First item</ListGroupItem>
    <ListGroupItem>Second item</ListGroupItem>
    <ListGroupItem>Third item</ListGroupItem>
  </ListGroup>
)

export const Horizontal: Story = () => (
  <ListGroup horizontal>
    <ListGroupItem>An item</ListGroupItem>
    <ListGroupItem>A second item</ListGroupItem>
    <ListGroupItem>A third item</ListGroupItem>
  </ListGroup>
)

export const Variants: Story = () => (
  <ListGroup style={{ maxWidth: 400 }}>
    <ListGroupItem>A simple default list group item</ListGroupItem>
    {COLORS.map((c) => (
      <ListGroupItem key={c} variant={c}>
        A simple {c} list group item
      </ListGroupItem>
    ))}
  </ListGroup>
)
