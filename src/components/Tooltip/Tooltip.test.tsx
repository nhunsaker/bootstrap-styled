import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen, waitFor } from '../../test/render'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('is hidden until hovered, then shows role="tooltip"', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Tooltip content="Hi there">
        <button>Trigger</button>
      </Tooltip>,
    )
    expect(screen.queryByRole('tooltip')).toBeNull()
    await user.hover(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hi there')
  })

  it('hides again on unhover', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Tooltip content="Hi">
        <button>Trigger</button>
      </Tooltip>,
    )
    const trigger = screen.getByRole('button', { name: 'Trigger' })
    await user.hover(trigger)
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
    await user.unhover(trigger)
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull())
  })

  it('shows on keyboard focus and hides on blur (a11y trigger parity)', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <>
        <Tooltip content="Focus tip">
          <button>Trigger</button>
        </Tooltip>
        <button>Elsewhere</button>
      </>,
    )
    await user.tab() // focus Trigger
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
    await user.tab() // move focus away
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull())
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Tooltip content="Hi">
        <button>Trigger</button>
      </Tooltip>,
    )
    await user.hover(screen.getByRole('button', { name: 'Trigger' }))
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument())
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull())
  })

  it('renders shown from first paint with defaultOpen', () => {
    renderWithTheme(
      <Tooltip content="Always" defaultOpen>
        <button>Trigger</button>
      </Tooltip>,
    )
    expect(screen.getByRole('tooltip')).toHaveTextContent('Always')
  })
})
