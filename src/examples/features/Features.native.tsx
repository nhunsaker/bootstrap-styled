import {
  SECTION_HEADING,
  CTA_LABEL,
  ICON_BOX_STYLE,
  FEATURES,
  CHEVRON_RIGHT_PATH,
} from './content'

/**
 * Features example — the native twin.
 *
 * Raw Bootstrap 5.3 markup for "Columns with icons"; identical text, utility
 * classes, inline SVGs (`bi bi-*`) and the fixed `feature-icon` inline style to
 * `Features.tsx`. Renders the reference under the oracle CSS.
 */
export function FeaturesNative() {
  return (
    <div className="container px-4 py-5">
      <h2 className="pb-2 border-bottom">{SECTION_HEADING}</h2>
      <div className="row g-4 py-5">
        {FEATURES.map((f) => (
          <div className="col-md-4" key={f.title}>
            <div
              className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
              style={ICON_BOX_STYLE}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={`bi bi-${f.bsName}`}
                aria-hidden="true"
                focusable="false"
                dangerouslySetInnerHTML={{ __html: f.path }}
              />
            </div>
            <h3 className="fs-2 text-body-emphasis">{f.title}</h3>
            <p>{f.body}</p>
            <a href="#" className="icon-link">
              {CTA_LABEL}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="bi bi-chevron-right"
                aria-hidden="true"
                focusable="false"
                dangerouslySetInnerHTML={{ __html: CHEVRON_RIGHT_PATH }}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
