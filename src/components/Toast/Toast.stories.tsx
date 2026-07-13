import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { Story } from '@ladle/react'
import { Toast, ToastHeader, ToastBody, ToastContainer } from './Toast'
import { Button } from '../Button'

export default { title: 'Components/Toast' }

export const Basic: Story = () => (
  <Toast defaultShow>
    <ToastHeader>
      <strong style={{ marginRight: 'auto' }}>Bootstrap</strong>
      <small style={{ color: 'var(--bs-secondary-color)' }}>11 mins ago</small>
    </ToastHeader>
    <ToastBody>Hello, world! This is a toast message.</ToastBody>
  </Toast>
)

export const HeaderlessWithColor: Story = () => (
  <Toast
    defaultShow
    style={{ '--bs-toast-bg': '#0d6efd', '--bs-toast-color': '#fff' } as CSSProperties}
  >
    <div style={{ display: 'flex' }}>
      <ToastBody>Hello, world! This is a toast message.</ToastBody>
    </div>
  </Toast>
)

export const Dismissible: Story = () => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Show toast
      </Button>
      <div style={{ marginTop: '1rem' }}>
        <Toast show={show} onClose={() => setShow(false)} autohide delay={3000}>
          <ToastHeader>
            <strong style={{ marginRight: 'auto' }}>Bootstrap</strong>
            <small>just now</small>
          </ToastHeader>
          <ToastBody>Auto-hides after 3s, or close it yourself.</ToastBody>
        </Toast>
      </div>
    </div>
  )
}

export const Container: Story = () => (
  <div style={{ position: 'relative', minHeight: 220, background: '#dee2e6', borderRadius: '0.375rem' }}>
    <ToastContainer position="top-end" style={{ padding: '1rem', position: 'absolute' }}>
      <Toast defaultShow>
        <ToastHeader>
          <strong style={{ marginRight: 'auto' }}>Bootstrap</strong>
          <small>just now</small>
        </ToastHeader>
        <ToastBody>Positioned toast in a container.</ToastBody>
      </Toast>
    </ToastContainer>
  </div>
)
