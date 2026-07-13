import React from 'react'
import { Container, Row, Col } from '../../components/Grid'
import { Heading } from '../../components/Typography'
import { Box } from '../../components/Box'
import { BsIconGear, BsIconHouse, BsIconStar, BsIconChevronRight } from '../../components/Icon'
import { SECTION_HEADING, CTA_LABEL, ICON_BOX_STYLE, FEATURES } from './content'

const ICONS: Record<string, React.ReactNode> = {
  gear: <BsIconGear />,
  house: <BsIconHouse />,
  star: <BsIconStar />,
}

/**
 * Features example — the styled composition.
 *
 * Mirrors Bootstrap's `examples/features/` "Columns with icons": a bordered
 * section heading over a 3-column grid, each column a rounded icon tile +
 * heading + copy + icon-link CTA. Composed from Container/Row/Col · Heading ·
 * Box · Icon; the `.native.tsx` twin is the 1:1 class equivalent.
 */
export function Features() {
  return (
    <Container className="px-4 py-5">
      <Heading as="h2" className="pb-2 border-bottom">
        {SECTION_HEADING}
      </Heading>
      <Row g={4} className="py-5">
        {FEATURES.map((f) => (
          <Col md={4} key={f.title}>
            <Box
              className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
              style={ICON_BOX_STYLE}
            >
              {ICONS[f.bsName]}
            </Box>
            <Heading as="h3" className="fs-2 text-body-emphasis">
              {f.title}
            </Heading>
            <Box as="p">{f.body}</Box>
            <a href="#" className="icon-link">
              {CTA_LABEL}
              <BsIconChevronRight />
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
