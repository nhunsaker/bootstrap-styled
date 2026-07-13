import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen, waitFor } from '../../test/render'
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from './Offcanvas'

function OffcanvasHarness() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Offcanvas show={open} onHide={() => setOpen(false)}>
        <OffcanvasHeader>
          <OffcanvasTitle>Panel</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          <button>First</button>
          <button>Second</button>
        </OffcanvasBody>
      </Offcanvas>
    </>
  )
}

describe('Offcanvas', () => {
  it('renders only when show is true', () => {
    const onHide = vi.fn()
    const { rerender } = renderWithTheme(
      <Offcanvas show={false} onHide={onHide}>
        <OffcanvasBody>Hi</OffcanvasBody>
      </Offcanvas>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
    rerender(
      <Offcanvas show onHide={onHide}>
        <OffcanvasBody>Hi</OffcanvasBody>
      </Offcanvas>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('exposes role="dialog" + aria-modal', () => {
    renderWithTheme(
      <Offcanvas show onHide={() => {}}>
        <OffcanvasBody>Hi</OffcanvasBody>
      </Offcanvas>,
    )
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('calls onHide on Escape', async () => {
    const user = userEvent.setup()
    const onHide = vi.fn()
    renderWithTheme(
      <Offcanvas show onHide={onHide}>
        <OffcanvasBody>Hi</OffcanvasBody>
      </Offcanvas>,
    )
    await user.keyboard('{Escape}')
    expect(onHide).toHaveBeenCalled()
  })

  it('locks body scroll while open and restores it on close', async () => {
    const onHide = vi.fn()
    const { rerender } = renderWithTheme(
      <Offcanvas show onHide={onHide}>
        <OffcanvasBody>Hi</OffcanvasBody>
      </Offcanvas>,
    )
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'))
    rerender(
      <Offcanvas show={false} onHide={onHide}>
        <OffcanvasBody>Hi</OffcanvasBody>
      </Offcanvas>,
    )
    await waitFor(() => expect(document.body.style.overflow).not.toBe('hidden'))
  })

  it('moves focus into the panel on open and returns it to the trigger on close', async () => {
    const user = userEvent.setup()
    renderWithTheme(<OffcanvasHarness />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    await waitFor(() => expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true))
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })

  it('traps Tab focus within the panel (never escapes to the page)', async () => {
    const user = userEvent.setup()
    renderWithTheme(<OffcanvasHarness />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    const panel = await screen.findByRole('dialog')
    let reachedInside = false
    for (let i = 0; i < 6; i++) {
      await user.tab()
      const a = document.activeElement
      expect(a).not.toBe(trigger)
      if (panel.contains(a)) reachedInside = true
    }
    expect(reachedInside).toBe(true)
  })

  it('closes on backdrop mousedown', async () => {
    const user = userEvent.setup()
    renderWithTheme(<OffcanvasHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    const panel = await screen.findByRole('dialog')
    const backdrop = panel.parentElement as HTMLElement
    await user.pointer({ target: backdrop, keys: '[MouseLeft]' })
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })
})
