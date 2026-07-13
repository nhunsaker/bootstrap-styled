import React from 'react'
import { BsIconStar } from '../../index'
import { BsIconTwitter } from '../../components/Icon/generated/BsIconTwitter'
import { BsIconInstagram } from '../../components/Icon/generated/BsIconInstagram'
import { BsIconFacebook } from '../../components/Icon/generated/BsIconFacebook'
import { BsIconGithub } from '../../components/Icon/generated/BsIconGithub'

/**
 * Native twin of Footers.tsx — raw Bootstrap 5.3.8 `.container`/`.row`/`.col-md-*`
 * grid under the vendored oracle CSS, with the link lists + bottom bar carrying
 * the SAME inline styles as the styled side (so they're byte-equivalent) and the
 * same `<BsIcon*>` icons. The grid classes + Reboot (h5/p) are the Bootstrap
 * reference the diff validates.
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

export function FootersNative() {
  return (
    <footer className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="row">
        <div className="col-md-4" style={{ marginBottom: '1rem' }}>
          <a href="#" style={brandStyle}>
            <BsIconStar size={28} aria-hidden />
            <span style={{ fontSize: '1.25rem' }}>Bootstrap</span>
          </a>
          <p style={{ color: SECONDARY }}>Designed and built with all the love in the world.</p>
        </div>

        {SECTIONS.map((s) => (
          <div className="col-md-2" style={{ marginBottom: '1rem' }} key={s.title}>
            <h5>{s.title}</h5>
            <ul style={ulStyle}>
              {s.links.map((l) => (
                <li key={l} style={liStyle}>
                  <a href="#" style={linkStyle}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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
    </footer>
  )
}

export default FootersNative
