import { BRAND, NAV_LINKS, LOGIN_LABEL, SIGNUP_LABEL, STAR_PATH } from './content'

/**
 * Headers example — the native twin.
 *
 * Raw Bootstrap 5.3 markup (plain elements + `.container` / `.nav-pills` /
 * `.btn` classes) that renders the reference layout under the oracle CSS. Kept
 * 1:1 with `Headers.tsx`'s intended output: identical text, identical utility
 * classes, and the same inline `star` SVG our `<BsIconStar/>` emits (`bi
 * bi-star`, 32×32, `currentColor`).
 */
export function HeadersNative() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 16 16"
            fill="currentColor"
            className="bi bi-star me-2"
            aria-hidden="true"
            focusable="false"
            dangerouslySetInnerHTML={{ __html: `<path d="${STAR_PATH}"/>` }}
          />
          <span className="fs-4">{BRAND}</span>
        </a>

        <ul className="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {NAV_LINKS.map((link) => (
            <li className="nav-item" key={link.label}>
              <a
                href={link.href}
                className={`nav-link px-2${link.active ? ' active' : ''}`}
                aria-current={link.active ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="col-md-3 text-end">
          <button type="button" className="btn btn-outline-primary me-2">
            {LOGIN_LABEL}
          </button>
          <button type="button" className="btn btn-primary">
            {SIGNUP_LABEL}
          </button>
        </div>
      </header>
    </div>
  )
}
