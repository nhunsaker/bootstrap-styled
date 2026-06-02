import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '../../test/render'
import { Tabs, Tab } from './Tabs'

describe('Tabs', () => {
  it('shows the default panel and switches on click', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Tabs defaultActiveKey="a">
        <Tab eventKey="a" title="First">
          First content
        </Tab>
        <Tab eventKey="b" title="Second">
          Second content
        </Tab>
      </Tabs>,
    )
    expect(screen.getByText('First content')).toBeInTheDocument()
    expect(screen.queryByText('Second content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Second' }))
    expect(screen.getByText('Second content')).toBeInTheDocument()
    expect(screen.queryByText('First content')).not.toBeInTheDocument()
  })

  it('marks the active tab with aria-selected', () => {
    renderWithTheme(
      <Tabs defaultActiveKey="a">
        <Tab eventKey="a" title="First">
          A
        </Tab>
        <Tab eventKey="b" title="Second">
          B
        </Tab>
      </Tabs>,
    )
    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'false')
  })
})
