import { useState } from 'react'
import type { Story } from '@ladle/react'
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownDivider, Tooltip, Popover, CloseButton, Button, Stack } from '../../src'

export default { title: 'Overlays' }

export const ModalExample: Story = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button onClick={() => setShow(true)}>Open modal</Button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <ModalHeader>
          <ModalTitle>Modal title</ModalTitle>
          <CloseButton onClick={() => setShow(false)} />
        </ModalHeader>
        <ModalBody>Escape, backdrop click, and the × all close this modal.</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button onClick={() => setShow(false)}>Save changes</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
ModalExample.storyName = 'Modal'

export const OffcanvasExample: Story = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)}>Open offcanvas</Button>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <OffcanvasHeader>
          <OffcanvasTitle>Offcanvas</OffcanvasTitle>
          <CloseButton onClick={() => setShow(false)} />
        </OffcanvasHeader>
        <OffcanvasBody>Slides in from the end. Escape or backdrop click closes.</OffcanvasBody>
      </Offcanvas>
    </>
  )
}
OffcanvasExample.storyName = 'Offcanvas'

export const DropdownExample: Story = () => (
  <Dropdown>
    <DropdownToggle>Actions</DropdownToggle>
    <DropdownMenu>
      <DropdownItem onClick={() => alert('Edit clicked')}>Edit</DropdownItem>
      <DropdownItem onClick={() => alert('Duplicate clicked')}>Duplicate</DropdownItem>
      <DropdownDivider />
      <DropdownItem disabled>Delete</DropdownItem>
    </DropdownMenu>
  </Dropdown>
)
DropdownExample.storyName = 'Dropdown'

export const TooltipExample: Story = () => (
  <Stack direction="horizontal" gap={3}>
    <Tooltip content="Tooltip on top" placement="top">
      <Button variant="outline-secondary">Top</Button>
    </Tooltip>
    <Tooltip content="Tooltip on right" placement="right">
      <Button variant="outline-secondary">Right</Button>
    </Tooltip>
    <Tooltip content="Tooltip on bottom" placement="bottom">
      <Button variant="outline-secondary">Bottom</Button>
    </Tooltip>
  </Stack>
)
TooltipExample.storyName = 'Tooltip'

export const PopoverExample: Story = () => (
  <Stack direction="horizontal" gap={3}>
    <Popover title="Popover title" content="And here's the popover body content." placement="right">
      <Button variant="outline-primary">Click me</Button>
    </Popover>
    <Popover content="A popover without a title." placement="top">
      <Button variant="outline-secondary">No title</Button>
    </Popover>
  </Stack>
)
PopoverExample.storyName = 'Popover'
