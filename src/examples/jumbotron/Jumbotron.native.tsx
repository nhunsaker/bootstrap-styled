import { BsIconChevronRight } from '../../index'

/**
 * Jumbotron — the raw Bootstrap 5.3.x markup twin (the oracle side).
 *
 * Verbatim Bootstrap utility markup for the "hero panel" pattern the 5.x docs
 * recommend in place of the removed `.jumbotron` class. Styled by the vendored
 * oracle CSS alone (no Provider, no styled-components). It carries the SAME
 * intended DOM as `Jumbotron.tsx`, so the pixel-diff measures parity, not
 * layout drift.
 *
 * The one shared React element is the icon (`<BsIconChevronRight>`), rendered
 * identically on both sides so its SVG never diffs.
 */
export function JumbotronNative() {
  return (
    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
      <h1 className="display-4">Build faster with components</h1>
      <p className="lead">
        A complete Bootstrap 5.3 component set, styled with styled-components and
        themeable end-to-end through CSS custom properties.
      </p>
      <hr className="my-4" />
      <p>
        This hero is composed entirely from bootstrap-styled primitives — utility
        props on a Box, typography helpers, and a button — so it re-skins live the
        moment a token changes.
      </p>
      <a className="btn btn-primary btn-lg" href="#" role="button">
        Learn more <BsIconChevronRight size={18} />
      </a>
    </div>
  )
}
JumbotronNative.displayName = 'JumbotronNative'
