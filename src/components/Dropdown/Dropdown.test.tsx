import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen, waitFor } from '../../test/render'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownDivider } from './Dropdown'

function Menu() {
  return (
    <Dropdown>
      <DropdownToggle>Menu</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Another action</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Separated link</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

describe('Dropdown', () => {
  it('opens on toggle click and closes on item click', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Menu />)
    expect(screen.queryByRole('menu')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('menuitem', { name: 'Action' }))
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('reflects open state via aria-expanded + advertises aria-haspopup', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Menu />)
    const toggle = screen.getByRole('button', { name: 'Menu' })
    expect(toggle).toHaveAttribute('aria-haspopup', 'menu')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('marks items with role="menuitem" and the menu with role="menu"', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Menu />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(3)
  })

  it('navigates items with ArrowDown/ArrowUp (roving focus)', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Menu />)
    const toggle = screen.getByRole('button', { name: 'Menu' })
    await user.click(toggle)
    const items = screen.getAllByRole('menuitem')
    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(document.activeElement).toBe(items[0]))
    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(document.activeElement).toBe(items[1]))
    await user.keyboard('{ArrowUp}')
    await waitFor(() => expect(document.activeElement).toBe(items[0]))
  })

  it('closes on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Menu />)
    const toggle = screen.getByRole('button', { name: 'Menu' })
    await user.click(toggle)
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    await waitFor(() => expect(document.activeElement).toBe(toggle))
  })

  it('supports defaultOpen (shown from first paint)', () => {
    renderWithTheme(
      <Dropdown defaultOpen>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    )
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})
