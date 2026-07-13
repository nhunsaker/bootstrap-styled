import { Container } from '../../components/Grid'
import { Nav, NavItem, NavLink } from '../../components/Nav'
import { Button } from '../../components/Button'
import { Box } from '../../components/Box'
import { BsIconStar } from '../../components/Icon'
import { BRAND, NAV_LINKS, LOGIN_LABEL, SIGNUP_LABEL } from './content'

/**
 * Headers example — the styled composition.
 *
 * Mirrors Bootstrap's `examples/headers/` "logo + nav + buttons" bar: a brand
 * mark on the left, centred pill navigation, and right-aligned auth buttons,
 * wrapping responsively. Built entirely from our library components (Container ·
 * Nav · Button · Icon · Box) so the render is a real composition test.
 *
 * Layout utilities (`d-flex`, `justify-content-*`, `col-*`, spacing, borders)
 * ride Bootstrap's utility CSS via `className` / `<Box>` — the same classes the
 * native twin uses — so the two sides differ only in the *components*, not the
 * layout. The `.native.tsx` twin is the byte-for-byte class equivalent.
 */
export function Headers() {
  return (
    <Container>
      <Box
        as="header"
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
      >
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <BsIconStar size={32} className="me-2" />
          <Box as="span" className="fs-4">
            {BRAND}
          </Box>
        </a>

        <Nav
          variant="pills"
          className="col-12 col-md-auto mb-2 justify-content-center mb-md-0"
        >
          {NAV_LINKS.map((link) => (
            <NavItem key={link.label}>
              <NavLink href={link.href} active={link.active} className="px-2">
                {link.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <Box className="col-md-3 text-end">
          <Button type="button" variant="outline-primary" className="me-2">
            {LOGIN_LABEL}
          </Button>
          <Button type="button" variant="primary">
            {SIGNUP_LABEL}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
