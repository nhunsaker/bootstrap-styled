import {
  BsIconChevronDown,
  BsIconPlus,
  BsIconTrash,
  BsIconStar,
  BsIconCheck,
} from '../../index'

/**
 * KitchenSink — the raw Bootstrap 5.3.x markup twin (the oracle side).
 *
 * Verbatim Bootstrap classes for every surface, laid out in the same Grid, with
 * the SAME intended DOM as `KitchenSink.tsx`. Styled by the vendored oracle CSS
 * alone. Icons are the same shared `<BsIcon*>` React elements on both sides so
 * their SVG never diverges.
 *
 * Static-cell caveats (identical to the styled twin): the Modal is a shown
 * `.modal-dialog` inline (no portal/backdrop) and the Dropdown is shown closed
 * (toggle only).
 */
export function KitchenSinkNative() {
  return (
    <div className="container">
      <div className="row g-4">
        {/* Buttons ------------------------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Buttons</div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2 mb-3">
                <button type="button" className="btn btn-primary">
                  Primary
                </button>
                <button type="button" className="btn btn-secondary">
                  Secondary
                </button>
                <button type="button" className="btn btn-success">
                  Success
                </button>
                <button type="button" className="btn btn-danger">
                  Danger
                </button>
                <button type="button" className="btn btn-warning">
                  Warning
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <button type="button" className="btn btn-outline-primary">
                  Outline
                </button>
                <button type="button" className="btn btn-primary btn-sm">
                  Small
                </button>
                <button type="button" className="btn btn-primary btn-lg">
                  Large
                </button>
                <button type="button" className="btn btn-primary" disabled>
                  Disabled
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary">
                  <BsIconPlus size={16} /> New
                </button>
                <button type="button" className="btn btn-outline-danger">
                  <BsIconTrash size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Badges & Breadcrumbs ----------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Badges & breadcrumbs</div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                <span className="badge text-bg-primary">Primary</span>
                <span className="badge text-bg-secondary">Secondary</span>
                <span className="badge text-bg-success">Success</span>
                <span className="badge text-bg-danger">Danger</span>
                <span className="badge text-bg-warning">Warning</span>
                <span className="badge text-bg-info">Info</span>
                <span className="badge rounded-pill text-bg-primary">
                  <BsIconStar size={12} /> Pill
                </span>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Library</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Data
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Alerts ------------------------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Alerts</div>
            <div className="card-body">
              <div className="alert alert-success" role="alert">
                <BsIconCheck size={16} /> Your token was saved.
              </div>
              <div className="alert alert-warning" role="alert">
                Heads up — this preview is unpublished.
              </div>
              <div className="mb-0">
                <div className="alert alert-danger" role="alert" style={{ marginBottom: 0 }}>
                  Something went wrong. Please try again.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List group --------------------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">List group</div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item active" aria-current="true">
                  An active item
                </li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item list-group-item-success">A success item</li>
                <li className="list-group-item disabled" aria-disabled="true">
                  A disabled item
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dropdown & Pagination --------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Dropdown & pagination</div>
            <div className="card-body">
              <div className="mb-3">
                <div className="dropdown">
                  <button type="button" className="btn btn-secondary" aria-expanded="false">
                    Dropdown <BsIconChevronDown size={14} />
                  </button>
                </div>
              </div>
              <nav aria-label="Page navigation">
                {/* `.mb-0` neutralizes Reboot's incidental `ul { margin-bottom: 1rem }`
                    (which Bootstrap's `.pagination` never resets) so this twin is 1:1
                    with the styled <Pagination>, whose margin-bottom is 0. Without it
                    the native card is 16px taller, shifting the Form/Modal row below. */}
                <ul className="pagination mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Nav / Tabs --------------------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Nav / tabs</div>
            <div className="card-body">
              <div>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" type="button" role="tab" aria-selected="true">
                      Home
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" type="button" role="tab" aria-selected="false">
                      Profile
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" type="button" role="tab" aria-selected="false">
                      Contact
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" role="tabpanel">
                    Home panel content.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form --------------------------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Form</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label" htmlFor="ks-email-n">
                  Email address
                </label>
                <input
                  className="form-control"
                  id="ks-email-n"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="ks-pref-n">
                  Preference
                </label>
                <select className="form-select" id="ks-pref-n" defaultValue="1">
                  <option value="1">Tokens</option>
                  <option value="2">Components</option>
                  <option value="3">Both</option>
                </select>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="ks-check-n" />
                <label className="form-check-label" htmlFor="ks-check-n">
                  Send me updates
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Modal (static, shown) --------------------------------------- */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Modal (static)</div>
            <div className="card-body">
              {/* `.modal` hosts the --bs-modal-* padding vars that `.modal-header/
                  -body/-footer` read; neutralize its fixed full-screen layout so it
                  sits inline in the static page. */}
              <div
                className="modal"
                style={{ position: 'static', display: 'block', width: 'auto', height: 'auto' }}
              >
                <div className="modal-dialog" style={{ margin: 0, maxWidth: '100%' }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Save changes?</h5>
                      <button type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <p className="mb-0">Your changes will be applied to the live preview.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary">
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
KitchenSinkNative.displayName = 'KitchenSinkNative'
