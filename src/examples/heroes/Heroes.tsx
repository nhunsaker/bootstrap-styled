import { Button } from '../../components/Button'
import { Box } from '../../components/Box'
import { Display, Lead } from '../../components/Typography'
import { BsIconStar } from '../../components/Icon'
import { HEADING, LEAD, PRIMARY_CTA, SECONDARY_CTA } from './content'

/**
 * Heroes example — the styled composition.
 *
 * Mirrors Bootstrap's `examples/heroes/` "Centered hero": a centred logo, a
 * `display` heading, a constrained lead paragraph, and a responsive CTA pair
 * (grid-stacked on xs, inline-centred from sm). Composed from Display · Lead ·
 * Button · Icon · Box; layout rides Bootstrap utility classes, matched 1:1 by
 * the `.native.tsx` twin.
 */
export function Heroes() {
  return (
    <Box className="px-4 py-5 my-5 text-center">
      <BsIconStar size={72} className="d-block mx-auto mb-4 text-primary" />
      <Display as="h1" size={5} className="fw-bold text-body-emphasis">
        {HEADING}
      </Display>
      <Box className="col-lg-6 mx-auto">
        <Lead className="mb-4">{LEAD}</Lead>
        <Box className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button type="button" variant="primary" size="lg" className="px-4 gap-3">
            {PRIMARY_CTA}
          </Button>
          <Button type="button" variant="outline-secondary" size="lg" className="px-4">
            {SECONDARY_CTA}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
