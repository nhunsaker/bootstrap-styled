import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '../../test/render'
import { Button } from './Button'

describe('Button', () => {
  it('renders its children', () => {
    renderWithTheme(<Button>Click</Button>)
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument()
  })

  it('renders as an anchor with as="a"', () => {
    renderWithTheme(
      <Button as="a" href="#x">
        Link
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '#x')
  })

  it('is disabled and does not fire onClick when disabled', async () => {
    const onClick = vi.fn()
    renderWithTheme(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    )
    const btn = screen.getByRole('button', { name: 'Nope' })
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })
})
