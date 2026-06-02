import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '../../test/render'
import { Modal, ModalBody } from './Modal'

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
})
