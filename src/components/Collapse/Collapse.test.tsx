import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '../../test/render'
import { Collapse, useCollapse } from './Collapse'

// A tiny consumer that wires a trigger to a Collapse via the helper hook.
function CollapseWithToggle({
  onToggle,
  defaultOpen,
}: {
  onToggle?: (open: boolean) => void
  defaultOpen?: boolean
}) {
  const { toggleProps, collapseProps } = useCollapse({ defaultOpen, onToggle })
  return (
    <>
      <button {...toggleProps}>Toggle</button>
      <Collapse {...collapseProps}>Panel body</Collapse>
    </>
  )
}

describe('useCollapse', () => {
  it('wires aria-expanded + aria-controls to the collapse id', () => {
    renderWithTheme(<CollapseWithToggle />)
    const trigger = screen.getByRole('button', { name: 'Toggle' })
    const panel = screen.getByText('Panel body')
    // aria-controls on the trigger points at the collapse element's id.
    expect(trigger).toHaveAttribute('aria-controls')
    expect(trigger.getAttribute('aria-controls')).toBe(panel.getAttribute('id'))
    // Collapsed by default.
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('flips aria-expanded and notifies onToggle on click', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    renderWithTheme(<CollapseWithToggle onToggle={onToggle} />)
    const trigger = screen.getByRole('button', { name: 'Toggle' })

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(onToggle).toHaveBeenLastCalledWith(true)

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(onToggle).toHaveBeenLastCalledWith(false)
  })

  it('honours a controlled open value', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    function Controlled() {
      // open is fixed true → clicking reports intent but does not change aria.
      const { toggleProps, collapseProps } = useCollapse({ open: true, onToggle })
      return (
        <>
          <button {...toggleProps}>Toggle</button>
          <Collapse {...collapseProps}>Body</Collapse>
        </>
      )
    }
    renderWithTheme(<Controlled />)
    const trigger = screen.getByRole('button', { name: 'Toggle' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await user.click(trigger)
    // Controlled: state didn't self-manage, but onToggle fired with next intent.
    expect(onToggle).toHaveBeenCalledWith(false)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})
