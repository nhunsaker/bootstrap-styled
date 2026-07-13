import React from 'react'
import { Container, Row, Col, BsIconStar } from '../../index'
// Social icons live in the generated icon set (not the committed re-export
// subset), so they're deep-imported. They render identically on the native twin.
import { BsIconTwitter } from '../../components/Icon/generated/BsIconTwitter'
import { BsIconInstagram } from '../../components/Icon/generated/BsIconInstagram'
import { BsIconFacebook } from '../../components/Icon/generated/BsIconFacebook'
import { BsIconGithub } from '../../components/Icon/generated/BsIconGithub'

/**
 * Example page — Footer (styled).
 *
 * Mirrors Bootstrap's `/examples/footers`: columns of section links + a brand
 * column, then a bottom bar with a copyright line and social icons. Built from
 * bootstrap-styled `Container`/`Row`/`Col` + `<BsIcon*>` for every icon (so the
 * native twin is pixel-identical — no icon fonts, no external images).
 *
 * DETERMINISM: link lists + bottom bar use inline styles set to the EXACT
 * Bootstrap utility values (token-referenced with default fallbacks), matched
 * 1:1 by the oracle twin. View at ≥768px for the multi-column layout.
 */

const EMPHASIS = 'var(--bs-emphasis-color, #000)'
const SECONDARY = 'var(--bs-secondary-color, rgba(33, 37, 41, 0.75))'
const BORDER = 'var(--bs-border-color, #dee2e6)'

const ulStyle: React.CSSProperties = { paddingLeft: 0, listStyle: 'none', marginBottom: 0 }
const liStyle: React.CSSProperties = { marginBottom: '0.5rem' }
const linkStyle: React.CSSProperties = { padding: 0, color: SECONDARY, textDecoration: 'none' }
const brandStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.75rem',
  textDecoration: 'none',
  color: EMPHASIS,
}
const bottomBarStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  marginTop: '1.5rem',
  borderTop: `1px solid ${BORDER}`,
}
const socialUlStyle: React.CSSProperties = {
  display: 'flex',
  listStyle: 'none',
  paddingLeft: 0,
  marginBottom: 0,
  gap: '1rem',
}
const socialLinkStyle: React.CSSProperties = { color: SECONDARY, display: 'inline-flex' }

const SECTIONS: Array<{ title: string; links: string[] }> = [
  { title: 'Features', links: ['Cool stuff', 'Random feature', 'Team feature', 'Stuff for developers'] },
  { title: 'Enterprise', links: ['Great support', 'Bug tracking', 'Documentation', 'Guides'] },
  { title: 'Support', links: ['Help center', 'Community', 'Status', 'Contact'] },
  { title: 'About', links: ['Company', 'Careers', 'Press', 'Legal'] },
]

const LinkList = ({ title, links }: { title: string; links: string[] }) => (
  <Col md={2} style={{ marginBottom: '1rem' }}>
    <h5>{title}</h5>
    <ul style={ulStyle}>
      {links.map((l) => (
        <li key={l} style={liStyle}>
          <a href="#" style={linkStyle}>
            {l}
          </a>
        </li>
      ))}
    </ul>
  </Col>
)

export function Footers() {
  return (
    <Container as="footer" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <Row>
        {/* Brand column */}
        <Col md={4} style={{ marginBottom: '1rem' }}>
          <a href="#" style={brandStyle}>
            <BsIconStar size={28} aria-hidden />
            <span style={{ fontSize: '1.25rem' }}>Bootstrap</span>
          </a>
          <p style={{ color: SECONDARY }}>Designed and built with all the love in the world.</p>
        </Col>

        {/* Link columns */}
        {SECTIONS.map((s) => (
          <LinkList key={s.title} title={s.title} links={s.links} />
        ))}
      </Row>

      {/* Bottom bar — copyright + social icons */}
      <div style={bottomBarStyle}>
        <p style={{ marginBottom: 0, color: SECONDARY }}>© 2024 Company, Inc. All rights reserved.</p>
        <ul style={socialUlStyle}>
          <li>
            <a href="#" style={socialLinkStyle}>
              <BsIconTwitter size={24} label="Twitter" />
            </a>
          </li>
          <li>
            <a href="#" style={socialLinkStyle}>
              <BsIconInstagram size={24} label="Instagram" />
            </a>
          </li>
          <li>
            <a href="#" style={socialLinkStyle}>
              <BsIconFacebook size={24} label="Facebook" />
            </a>
          </li>
          <li>
            <a href="#" style={socialLinkStyle}>
              <BsIconGithub size={24} label="GitHub" />
            </a>
          </li>
        </ul>
      </div>
    </Container>
  )
}

export default Footers
