import React from 'react'
import {
  Button,
  Alert,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Spinner,
  Progress,
  ProgressBar,
  CloseButton,
  Accordion,
  AccordionItem,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PageItem,
  PageLink,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Tabs,
  Tab,
  type ColorName,
} from '../src'

/**
 * A parity cell = one component × variant/state rendered BOTH ways under
 * identical inputs:
 *   - `native`: raw Bootstrap markup, styled by the vendored oracle CSS
 *   - `styled`: the equivalent <BootstrapStyled…> React component
 *
 * The prop→class mapping is written HONESTLY (best 1:1 equivalent). Where the
 * mapping is lossy (e.g. Alert -subtle tokens, btn-close SVG), that is a real
 * parity gap the diff will surface — not something to paper over.
 */
export interface Cell {
  id: string
  component: string
  label: string
  /** Native Bootstrap markup (oracle side). */
  native: string
  /** Equivalent bootstrap-styled React node. */
  styled: React.ReactNode
  /** Optional note about a known mapping caveat. */
  note?: string
}

const COLORS: ColorName[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
]

const SIZES: Array<{ key: string; cls: string; prop?: 'sm' | 'lg' }> = [
  { key: 'md', cls: '' },
  { key: 'sm', cls: 'btn-sm', prop: 'sm' },
  { key: 'lg', cls: 'btn-lg', prop: 'lg' },
]

// ---------------------------------------------------------------------------
// Button — variants × sizes × solid/outline × default/disabled
// ---------------------------------------------------------------------------
const buttonCells: Cell[] = []
for (const color of COLORS) {
  for (const outline of [false, true]) {
    for (const size of SIZES) {
      for (const disabled of [false, true]) {
        const variantClass = outline ? `btn-outline-${color}` : `btn-${color}`
        const variantProp = (outline ? `outline-${color}` : color) as
          | ColorName
          | `outline-${ColorName}`
        const label = color
        const id = `button--${outline ? 'outline-' : ''}${color}--${size.key}--${
          disabled ? 'disabled' : 'default'
        }`
        const nativeCls = ['btn', variantClass, size.cls].filter(Boolean).join(' ')
        buttonCells.push({
          id,
          component: 'Button',
          label: `${variantProp} ${size.key}${disabled ? ' disabled' : ''}`,
          native: `<button type="button" class="${nativeCls}"${
            disabled ? ' disabled' : ''
          }>${label}</button>`,
          styled: (
            <Button variant={variantProp} size={size.prop} disabled={disabled}>
              {label}
            </Button>
          ),
        })
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Alert — variants
// ---------------------------------------------------------------------------
const alertCells: Cell[] = COLORS.map((color) => ({
  id: `alert--${color}`,
  component: 'Alert',
  label: color,
  note: 'bootstrap-styled derives fill via color-mix; Bootstrap 5.3 uses -subtle/-emphasis tokens',
  native: `<div class="alert alert-${color}" role="alert">This is a ${color} alert</div>`,
  styled: <Alert variant={color}>This is a {color} alert</Alert>,
}))

// ---------------------------------------------------------------------------
// Badge — variants + pill
// ---------------------------------------------------------------------------
const badgeCells: Cell[] = [
  ...COLORS.map((color) => ({
    id: `badge--${color}`,
    component: 'Badge',
    label: color,
    native: `<span class="badge text-bg-${color}">${color}</span>`,
    styled: <Badge variant={color}>{color}</Badge>,
  })),
  {
    id: 'badge--primary-pill',
    component: 'Badge',
    label: 'primary pill',
    native: `<span class="badge rounded-pill text-bg-primary">pill</span>`,
    styled: (
      <Badge variant="primary" pill>
        pill
      </Badge>
    ),
  },
]

// ---------------------------------------------------------------------------
// Card — header/body/title/subtitle/text/footer
// ---------------------------------------------------------------------------
const cardCells: Cell[] = [
  {
    id: 'card--basic',
    component: 'Card',
    label: 'basic',
    native: `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title.</p>
      </div>
    </div>`,
    styled: (
      <Card style={{ width: '18rem' }}>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title.</CardText>
        </CardBody>
      </Card>
    ),
  },
  {
    id: 'card--header-footer',
    component: 'Card',
    label: 'header+footer',
    native: `<div class="card" style="width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below.</p>
      </div>
      <div class="card-footer">Footer</div>
    </div>`,
    styled: (
      <Card style={{ width: '18rem' }}>
        <CardHeader>Header</CardHeader>
        <CardBody>
          <CardTitle>Special title treatment</CardTitle>
          <CardText>With supporting text below.</CardText>
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    ),
  },
]

// ---------------------------------------------------------------------------
// Spinner — default / sm / colored
// ---------------------------------------------------------------------------
const spinnerCells: Cell[] = [
  {
    id: 'spinner--default',
    component: 'Spinner',
    label: 'default',
    native: `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`,
    styled: <Spinner />,
  },
  {
    id: 'spinner--sm',
    component: 'Spinner',
    label: 'sm',
    native: `<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>`,
    styled: <Spinner size="sm" />,
  },
  {
    id: 'spinner--primary',
    component: 'Spinner',
    label: 'primary',
    native: `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`,
    styled: <Spinner variant="primary" />,
  },
  {
    id: 'spinner--success',
    component: 'Spinner',
    label: 'success',
    native: `<div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>`,
    styled: <Spinner variant="success" />,
  },
]

// ---------------------------------------------------------------------------
// Progress — widths × variants
// ---------------------------------------------------------------------------
const progressSpecs: Array<{ now: number; variant?: ColorName; cls?: string }> = [
  { now: 25 },
  { now: 45 },
  { now: 70, variant: 'success', cls: 'bg-success' },
  { now: 90, variant: 'danger', cls: 'bg-danger' },
]
const progressCells: Cell[] = progressSpecs.map((s) => ({
  id: `progress--${s.now}${s.variant ? '-' + s.variant : ''}`,
  component: 'Progress',
  label: `${s.now}%${s.variant ? ' ' + s.variant : ''}`,
  native: `<div class="progress" style="width: 16rem;">
    <div class="progress-bar ${s.cls ?? ''}" role="progressbar" style="width: ${
      s.now
    }%" aria-valuenow="${s.now}" aria-valuemin="0" aria-valuemax="100"></div>
  </div>`,
  styled: (
    <Progress style={{ width: '16rem' }}>
      <ProgressBar now={s.now} variant={s.variant ?? 'primary'} />
    </Progress>
  ),
}))

// ---------------------------------------------------------------------------
// CloseButton — default / disabled
// ---------------------------------------------------------------------------
const closeCells: Cell[] = [
  {
    id: 'closebutton--default',
    component: 'CloseButton',
    label: 'default',
    note: 'Bootstrap btn-close uses an SVG background-image; styled renders a × glyph',
    native: `<button type="button" class="btn-close" aria-label="Close"></button>`,
    styled: <CloseButton />,
  },
  {
    id: 'closebutton--disabled',
    component: 'CloseButton',
    label: 'disabled',
    note: 'Bootstrap btn-close uses an SVG background-image; styled renders a × glyph',
    native: `<button type="button" class="btn-close" disabled aria-label="Close"></button>`,
    styled: <CloseButton disabled />,
  },
]

// ---------------------------------------------------------------------------
// Accordion — first item open, second collapsed (static; defaultActiveKey)
// ---------------------------------------------------------------------------
const accordionCells: Cell[] = [
  {
    id: 'accordion--first-open',
    component: 'Accordion',
    label: 'first open',
    note: 'styled chevron is a CSS border-rotate + open bg via color-mix(primary 10%); Bootstrap uses an SVG-mask chevron + --bs-accordion-active-bg/-active-color tokens',
    native: `<div style="width: 22rem"><div class="accordion">
      <div class="accordion-item">
        <h2 class="accordion-header"><button class="accordion-button" type="button">Accordion Item #1</button></h2>
        <div class="accordion-collapse collapse show"><div class="accordion-body">First item body content.</div></div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header"><button class="accordion-button collapsed" type="button">Accordion Item #2</button></h2>
        <div class="accordion-collapse collapse"><div class="accordion-body">Second item body content.</div></div>
      </div>
    </div></div>`,
    styled: (
      <div style={{ width: '22rem' }}>
        <Accordion defaultActiveKey="0">
          <AccordionItem eventKey="0" header="Accordion Item #1">
            First item body content.
          </AccordionItem>
          <AccordionItem eventKey="1" header="Accordion Item #2">
            Second item body content.
          </AccordionItem>
        </Accordion>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Breadcrumb — default with active trailing crumb
// ---------------------------------------------------------------------------
const breadcrumbCells: Cell[] = [
  {
    id: 'breadcrumb--default',
    component: 'Breadcrumb',
    label: 'default',
    note: 'Bootstrap divider is the --bs-breadcrumb-divider var (default "/") on ::before; styled hardcodes "/" — same glyph, but no divider-override token',
    native: `<nav aria-label="breadcrumb"><ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Library</a></li>
      <li class="breadcrumb-item active" aria-current="page">Data</li>
    </ol></nav>`,
    styled: (
      <nav aria-label="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="#">Library</a>
          </BreadcrumbItem>
          <BreadcrumbItem active>Data</BreadcrumbItem>
        </Breadcrumb>
      </nav>
    ),
  },
]

// ---------------------------------------------------------------------------
// Pagination — default (active + disabled) × sizes (sm/lg = MISSING variant)
// ---------------------------------------------------------------------------
const paginationNative = (ulExtra = '') => `<ul class="pagination${ulExtra}">
  <li class="page-item disabled"><a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a></li>
  <li class="page-item"><a class="page-link" href="#">1</a></li>
  <li class="page-item active" aria-current="page"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
  <li class="page-item"><a class="page-link" href="#">Next</a></li>
</ul>`

const StyledPagination = (size?: 'sm' | 'lg') => (
  <Pagination size={size}>
    <PageItem>
      <PageLink href="#" disabled>
        Previous
      </PageLink>
    </PageItem>
    <PageItem>
      <PageLink href="#">1</PageLink>
    </PageItem>
    <PageItem>
      <PageLink href="#" active>
        2
      </PageLink>
    </PageItem>
    <PageItem>
      <PageLink href="#">3</PageLink>
    </PageItem>
    <PageItem>
      <PageLink href="#">Next</PageLink>
    </PageItem>
  </Pagination>
)

const paginationCells: Cell[] = [
  {
    id: 'pagination--default',
    component: 'Pagination',
    label: 'default (active+disabled)',
    native: paginationNative(),
    styled: StyledPagination(),
  },
  {
    id: 'pagination--sm',
    component: 'Pagination',
    label: 'sm',
    native: paginationNative(' pagination-sm'),
    styled: StyledPagination('sm'),
  },
  {
    id: 'pagination--lg',
    component: 'Pagination',
    label: 'lg',
    native: paginationNative(' pagination-lg'),
    styled: StyledPagination('lg'),
  },
]

// ---------------------------------------------------------------------------
// Nav — base (near-parity) + tabs/pills/fill (all MISSING style variants:
// styled Nav has no tabs/pills/fill, so these map to the plain <Nav> and the
// diff measures how far the un-styled base falls from each Bootstrap variant).
// ---------------------------------------------------------------------------
const navBaseNative = (ulExtra = '', active = true) => `<ul class="nav${ulExtra}">
  <li class="nav-item"><a class="nav-link${active ? ' active' : ''}"${active ? ' aria-current="page"' : ''} href="#">Active</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Another</a></li>
  <li class="nav-item"><a class="nav-link disabled" aria-disabled="true">Disabled</a></li>
</ul>`

const StyledNav = (props: { variant?: 'tabs' | 'pills'; fill?: boolean } = {}) => (
  <Nav variant={props.variant} fill={props.fill}>
    <NavItem>
      <NavLink active href="#">
        Active
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Link</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Another</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled>Disabled</NavLink>
    </NavItem>
  </Nav>
)

const navCells: Cell[] = [
  {
    id: 'nav--base',
    component: 'Nav',
    label: 'base',
    native: navBaseNative(''),
    styled: StyledNav(),
  },
  {
    id: 'nav--tabs',
    component: 'Nav',
    label: 'tabs',
    native: navBaseNative(' nav-tabs'),
    styled: StyledNav({ variant: 'tabs' }),
  },
  {
    id: 'nav--pills',
    component: 'Nav',
    label: 'pills',
    native: navBaseNative(' nav-pills'),
    styled: StyledNav({ variant: 'pills' }),
  },
  {
    id: 'nav--fill',
    component: 'Nav',
    label: 'fill',
    native: `<div style="width: 30rem">${navBaseNative(' nav-pills nav-fill')}</div>`,
    styled: <div style={{ width: '30rem' }}>{StyledNav({ variant: 'pills', fill: true })}</div>,
  },
]

// ---------------------------------------------------------------------------
// Navbar — bare shell (no expand/toggler/container/NavbarNav sub-parts)
// ---------------------------------------------------------------------------
const navbarCells: Cell[] = [
  {
    id: 'navbar--basic',
    component: 'Navbar',
    label: 'brand only',
    note: 'styled Navbar is a bare flex shell: padding 0.5rem 1rem vs Bootstrap 0.5rem 0; NavbarBrand has no py/margin-right vs Bootstrap brand py 0.3125rem + mr 1rem. No expand/toggler/container/NavbarNav.',
    native: `<div style="width: 30rem"><nav class="navbar"><a class="navbar-brand" href="#">Sorb</a></nav></div>`,
    styled: (
      <div style={{ width: '30rem' }}>
        <Navbar>
          <NavbarBrand href="#">Sorb</NavbarBrand>
        </Navbar>
      </div>
    ),
  },
  {
    id: 'navbar--dark',
    component: 'Navbar',
    label: 'dark',
    note: 'color variant maps (bg-dark ≈ variant="dark"); remaining diff is the same brand/padding geometry gap as navbar--basic.',
    native: `<div style="width: 30rem"><nav class="navbar bg-dark" data-bs-theme="dark"><a class="navbar-brand" href="#">Sorb</a></nav></div>`,
    styled: (
      <div style={{ width: '30rem' }}>
        <Navbar variant="dark">
          <NavbarBrand href="#">Sorb</NavbarBrand>
        </Navbar>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Tabs — active tab shown statically (defaultActiveKey). Unlike <Nav>, the
// Tabs widget owns its own bordered tab look, so this is a real look-parity cell.
// ---------------------------------------------------------------------------
const tabsCells: Cell[] = [
  {
    id: 'tabs--basic',
    component: 'Tabs',
    label: 'first active',
    note: 'styled TabPanel adds 1rem 0 padding; Bootstrap .tab-pane has none → panel content sits ~1rem lower. Tab buttons themselves mirror nav-tabs closely.',
    native: `<div style="width: 30rem"><div>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation"><button class="nav-link active" type="button" role="tab" aria-selected="true">Home</button></li>
        <li class="nav-item" role="presentation"><button class="nav-link" type="button" role="tab" aria-selected="false">Profile</button></li>
        <li class="nav-item" role="presentation"><button class="nav-link" type="button" role="tab" disabled>Disabled</button></li>
      </ul>
      <div class="tab-content"><div class="tab-pane active" role="tabpanel">Home panel content.</div></div>
    </div></div>`,
    styled: (
      <div style={{ width: '30rem' }}>
        <Tabs defaultActiveKey="home">
          <Tab eventKey="home" title="Home">
            Home panel content.
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Profile panel content.
          </Tab>
          <Tab eventKey="disabled" title="Disabled" disabled>
            Disabled panel content.
          </Tab>
        </Tabs>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// NOT captured here (by design — behavioral/portal, deferred to P3):
//   Modal · Offcanvas · Dropdown · Tooltip · Popover
// Dropdown/Tooltip/Popover expose no open/defaultOpen prop (internal
// useState(false) opened only by click/hover) → cannot be forced static
// without a src change (out of scope). Modal/Offcanvas take `show` but render
// through a FloatingPortal + a viewport-fixed backdrop that (a) escapes the
// per-cell [data-cell-id] box and (b) would overlay/corrupt every other styled
// cell's screenshot. Their inner chrome (Dialog/Menu/Bubble/Card borders) is
// not exported, so it can't be reconstructed statically either. Forcing them in
// would break the run for no honest measurement — see scorecard/report.
// ---------------------------------------------------------------------------

export const cells: Cell[] = [
  ...buttonCells,
  ...alertCells,
  ...badgeCells,
  ...cardCells,
  ...spinnerCells,
  ...progressCells,
  ...closeCells,
  ...accordionCells,
  ...breadcrumbCells,
  ...paginationCells,
  ...navCells,
  ...navbarCells,
  ...tabsCells,
]

/** Distinct component names in fixture order (for scorecard grouping). */
export const componentOrder: string[] = cells.reduce<string[]>((acc, c) => {
  if (!acc.includes(c.component)) acc.push(c.component)
  return acc
}, [])
