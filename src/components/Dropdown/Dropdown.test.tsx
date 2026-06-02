import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '../../test/render'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from './Dropdown'

describe('Dropdown', () => {
  it('opens on toggle click and closes on item click', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Dropdown>
        <DropdownToggle>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    )
    expect(screen.queryByRole('menu')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('menuitem', { name: 'Action' }))
    expect(screen.queryByRole('menu')).toBeNull()
  })

  // Keyboard arrow-key navigation is implemented via floating-ui's
  // useListNavigation, but jsdom doesn't reliably replicate its focus/keydown
  // handling — that behavior is verified in the browser review instead.
})
