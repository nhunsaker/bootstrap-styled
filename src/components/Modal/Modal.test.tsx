import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen, waitFor } from '../../test/render'
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from './Modal'
import { Button } from '../Button/Button'

// A trigger + controlled Modal, mirroring real usage — needed to exercise
// focus-return (focus must go back to the element that opened the dialog).
function ModalHarness({ staticBackdrop = false }: { staticBackdrop?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal show={open} onHide={() => setOpen(false)} staticBackdrop={staticBackdrop}>
        <ModalHeader>
          <ModalTitle>Title</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <button>First</button>
          <button>Second</button>
        </ModalBody>
        <ModalFooter>
          <Button>Save</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

describe('Modal', () => {
  it('renders only when show is true', () => {
    const onHide = vi.fn()
    const { rerender } = renderWithTheme(
      <Modal show={false} onHide={onHide}>
        <ModalBody>Hi</ModalBody>
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()

    rerender(
      <Modal show onHide={onHide}>
        <ModalBody>Hi</ModalBody>
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Hi')).toBeInTheDocument()
  })

  it('exposes role="dialog" + aria-modal (ARIA dialog pattern)', () => {
    renderWithTheme(
      <Modal show onHide={() => {}}>
        <ModalBody>Hi</ModalBody>
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('calls onHide on Escape', async () => {
    const user = userEvent.setup()
    const onHide = vi.fn()
    renderWithTheme(
      <Modal show onHide={onHide}>
        <ModalBody>Hi</ModalBody>
      </Modal>,
    )
    await user.keyboard('{Escape}')
    expect(onHide).toHaveBeenCalled()
  })

  it('locks body scroll while open and restores it on close', async () => {
    const onHide = vi.fn()
    const { rerender } = renderWithTheme(
      <Modal show onHide={onHide}>
        <ModalBody>Hi</ModalBody>
      </Modal>,
    )
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'))
    rerender(
      <Modal show={false} onHide={onHide}>
        <ModalBody>Hi</ModalBody>
      </Modal>,
    )
    await waitFor(() => expect(document.body.style.overflow).not.toBe('hidden'))
  })

  it('moves focus into the dialog on open and returns it to the trigger on close', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ModalHarness />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    // focus lands inside the dialog
    await waitFor(() => expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true))
    // Escape closes and returns focus to the trigger
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })

  it('traps Tab focus within the dialog (never escapes to the page)', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ModalHarness />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
    const dialog = screen.getByRole('dialog')
    // Trap invariant: cycling Tab must reach the dialog's own controls and must
    // NEVER land on the trigger or page content behind the modal. (FloatingFocus-
    // Manager bounces focus off aria-hidden guards to enforce this.)
    let reachedInside = false
    for (let i = 0; i < 6; i++) {
      await user.tab()
      const a = document.activeElement
      expect(a).not.toBe(trigger)
      if (dialog.contains(a)) reachedInside = true
    }
    expect(reachedInside).toBe(true)
  })

  it('closes on backdrop mousedown, but not when staticBackdrop', async () => {
    const user = userEvent.setup()
    const { rerender } = renderWithTheme(<ModalHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = await screen.findByRole('dialog')
    const backdrop = dialog.parentElement as HTMLElement // FloatingOverlay wraps the dialog
    await user.pointer({ target: backdrop, keys: '[MouseLeft]' })
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())

    // static backdrop: same click must NOT close
    rerender(<ModalHarness staticBackdrop />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    const dialog2 = await screen.findByRole('dialog')
    const backdrop2 = dialog2.parentElement as HTMLElement
    await user.pointer({ target: backdrop2, keys: '[MouseLeft]' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
