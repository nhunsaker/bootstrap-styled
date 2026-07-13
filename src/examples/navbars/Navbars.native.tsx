import React from 'react'
import { BsIconStar, BsIconChevronDown } from '../../index'

/**
 * Native twin of Navbars.tsx — raw Bootstrap 5.3.8 markup + classes, rendered by
 * the vendored oracle CSS. 1:1 with the styled output so the harness diffs the
 * two side by side.
 *
 * Parity notes:
 *  - Icons are the SAME `<BsIcon*>` React components as the styled side (identical
 *    inline SVG) — Bootstrap's `.bi` icon font is not vendored, so both sides
 *    render icons this way and stay pixel-identical.
 *  - Brand + search-form use inline `display:flex/gap` mirroring the styled side's
 *    inline layout (instead of `me-2`) so the two are byte-equivalent in layout.
 *  - The nav-link colors/padding come from the oracle's `--bs-navbar-*` cascade
 *    (light nav = emphasis @0.65; dark/primary reach the light-on-dark values via
 *    `data-bs-theme="dark"`), which the styled side reproduces inline.
 */

const brandInline: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
}
const dropdownLinkInline: React.CSSProperties = { display: 'inline-flex', alignItems: 'center' }
const formInline: React.CSSProperties = { gap: '0.5rem' }

export function NavbarsNative() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 1 · Light scheme */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={brandInline}>
            <BsIconStar size={24} aria-hidden />
            Bootstrap
          </a>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav" style={{ marginRight: 'auto' }}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={dropdownLinkInline}>
                  Dropdown
                  <BsIconChevronDown size="0.75em" aria-hidden style={{ marginLeft: '0.35em' }} />
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" style={formInline}>
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* 2 · Dark scheme */}
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={brandInline}>
            <BsIconStar size={24} aria-hidden />
            Bootstrap
          </a>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav" style={{ marginRight: 'auto' }}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Docs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-light" type="button">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* 3 · Primary (colored) scheme */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={brandInline}>
            <BsIconStar size={24} aria-hidden />
            Bootstrap
          </a>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav" style={{ marginRight: 'auto' }}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
            <button className="btn btn-light" type="button">
              Get started
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarsNative
