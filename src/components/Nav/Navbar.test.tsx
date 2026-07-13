import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '../../test/render'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavbarCollapse,
  NavbarNav,
} from './Navbar'

function Basic(props: React.ComponentProps<typeof Navbar>) {
  return (
    <Navbar expand="lg" {...props}>
      <NavbarBrand href="#">Brand</NavbarBrand>
      <NavbarToggler />
      <NavbarCollapse>
        <NavbarNav>
          <li className="nav-item">Home</li>
        </NavbarNav>
      </NavbarCollapse>
    </Navbar>
  )
}

describe('Navbar', () => {
  it('renders the expand class + toggler with default collapsed aria', () => {
    const { container } = renderWithTheme(<Basic />)
    expect(container.querySelector('.navbar')).toHaveClass('navbar-expand-lg')
    const toggler = screen.getByRole('button', { name: 'Toggle navigation' })
    expect(toggler).toHaveClass('navbar-toggler')
    expect(toggler).toHaveAttribute('aria-expanded', 'false')
  })

  it('wires aria-controls to the collapse element id', () => {
    const { container } = renderWithTheme(<Basic />)
    const toggler = screen.getByRole('button', { name: 'Toggle navigation' })
    const collapse = container.querySelector('.navbar-collapse') as HTMLElement
    expect(collapse).toBeTruthy()
    expect(toggler.getAttribute('aria-controls')).toBe(collapse.getAttribute('id'))
  })

  it('toggles aria-expanded and fires onToggle on click', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    renderWithTheme(<Basic onToggle={onToggle} />)
    const toggler = screen.getByRole('button', { name: 'Toggle navigation' })

    await user.click(toggler)
    expect(toggler).toHaveAttribute('aria-expanded', 'true')
    expect(onToggle).toHaveBeenLastCalledWith(true)

    await user.click(toggler)
    expect(toggler).toHaveAttribute('aria-expanded', 'false')
    expect(onToggle).toHaveBeenLastCalledWith(false)
  })

  it('supports a controlled expanded prop', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    renderWithTheme(<Basic expanded onToggle={onToggle} />)
    const toggler = screen.getByRole('button', { name: 'Toggle navigation' })
    expect(toggler).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggler)
    // Controlled: reports intent but the parent owns the value.
    expect(onToggle).toHaveBeenCalledWith(false)
    expect(toggler).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders the toggler icon when no children given, and the navbar-nav list', () => {
    const { container } = renderWithTheme(<Basic />)
    expect(container.querySelector('.navbar-toggler-icon')).toBeTruthy()
    expect(container.querySelector('.navbar-nav')).toBeTruthy()
  })
})
