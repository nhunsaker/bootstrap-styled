import { HEADING, LEAD, PRIMARY_CTA, SECONDARY_CTA, STAR_PATH } from './content'

/**
 * Heroes example — the native twin.
 *
 * Raw Bootstrap 5.3 markup for the "Centered hero" reference; identical text,
 * utility classes, and inline `star` SVG to `Heroes.tsx`. Renders the reference
 * under the oracle CSS.
 */
export function HeroesNative() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={72}
        height={72}
        viewBox="0 0 16 16"
        fill="currentColor"
        className="bi bi-star d-block mx-auto mb-4 text-primary"
        aria-hidden="true"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: `<path d="${STAR_PATH}"/>` }}
      />
      <h1 className="display-5 fw-bold text-body-emphasis">{HEADING}</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">{LEAD}</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
            {PRIMARY_CTA}
          </button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">
            {SECONDARY_CTA}
          </button>
        </div>
      </div>
    </div>
  )
}
