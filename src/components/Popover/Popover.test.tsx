import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen, waitFor } from '../../test/render'
import { Popover } from './Popover'

describe('Popover', () => {
  it('toggles open/closed on trigger click', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Popover title="Heads up" content="Body copy">
        <button>Trigger</button>
      </Popover>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
    const trigger = screen.getByRole('button', { name: 'Trigger' })
    await user.click(trigger)
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })

  it('renders title + body when open', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Popover title="Heads up" content="Body copy">
        <button>Trigger</button>
      </Popover>,
    )
    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveTextContent('Heads up')
    expect(dialog).toHaveTextContent('Body copy')
  })

  it('omits the header when no title is given', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Popover content="Only body">
        <button>Trigger</button>
      </Popover>,
    )
    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveTextContent('Only body')
    expect(dialog).not.toHaveTextContent('undefined')
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Popover title="T" content="B">
        <button>Trigger</button>
      </Popover>,
    )
    const trigger = screen.getByRole('button', { name: 'Trigger' })
    await user.click(trigger)
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })

  it('renders shown from first paint with defaultOpen', () => {
    renderWithTheme(
      <Popover title="T" content="B" defaultOpen>
        <button>Trigger</button>
      </Popover>,
    )
    expect(screen.getByRole('dialog')).toHaveTextContent('B')
  })
})
