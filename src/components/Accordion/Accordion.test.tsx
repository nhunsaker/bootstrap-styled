import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithTheme, screen } from '../../test/render'
import { Accordion, AccordionItem } from './Accordion'

describe('Accordion', () => {
  it('opens the default item and toggles single-open', async () => {
    const user = userEvent.setup()
    renderWithTheme(
      <Accordion defaultActiveKey="0">
        <AccordionItem eventKey="0" header="One">
          Body one
        </AccordionItem>
        <AccordionItem eventKey="1" header="Two">
          Body two
        </AccordionItem>
      </Accordion>,
    )
    const [one, two] = screen.getAllByRole('button')
    expect(one).toHaveAttribute('aria-expanded', 'true')
    expect(two).toHaveAttribute('aria-expanded', 'false')

    await user.click(two)
    expect(two).toHaveAttribute('aria-expanded', 'true')
    expect(one).toHaveAttribute('aria-expanded', 'false')

    // Clicking an open item closes it.
    await user.click(two)
    expect(two).toHaveAttribute('aria-expanded', 'false')
  })
})
