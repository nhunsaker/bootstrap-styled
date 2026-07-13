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
  ButtonGroup,
  ButtonToolbar,
  ListGroup,
  ListGroupItem,
  Placeholder,
  PlaceholderGlow,
  Toast,
  ToastHeader,
  ToastBody,
  ToastContainer,
  Collapse,
  ScrollspyNav,
  Carousel,
  CarouselItem,
  CarouselCaption,
  Container,
  Row,
  Col,
  Ratio,
  Display,
  Lead,
  Heading,
  Blockquote,
  BlockquoteFooter,
  List,
  ListInlineItem,
  Table,
  Image,
  Figure,
  FigureImage,
  FigureCaption,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasTitle,
  OffcanvasBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  Tooltip,
  Popover,
  FormControl,
  FormSelect,
  FormCheck,
  FormRange,
  InputGroup,
  InputGroupText,
  FloatingLabel,
  FormFeedback,
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
// ButtonGroup — default · sizes sm/lg · vertical · toolbar
// ---------------------------------------------------------------------------
const bgBtns = (variant: string, labels: string[]) =>
  labels.map((l) => `<button type="button" class="btn btn-${variant}">${l}</button>`).join('')

const buttonGroupCells: Cell[] = [
  {
    id: 'buttongroup--default',
    component: 'ButtonGroup',
    label: 'default',
    native: `<div class="btn-group" role="group" aria-label="Basic example">${bgBtns(
      'primary',
      ['Left', 'Middle', 'Right'],
    )}</div>`,
    styled: (
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary">Left</Button>
        <Button variant="primary">Middle</Button>
        <Button variant="primary">Right</Button>
      </ButtonGroup>
    ),
  },
  {
    id: 'buttongroup--sm',
    component: 'ButtonGroup',
    label: 'sm',
    note: 'Bootstrap sizes the group via .btn-group-sm>.btn tokens; styled resizes children with a doubled-specificity rule.',
    native: `<div class="btn-group btn-group-sm" role="group" aria-label="Small">${bgBtns(
      'secondary',
      ['Left', 'Middle', 'Right'],
    )}</div>`,
    styled: (
      <ButtonGroup size="sm" aria-label="Small">
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Middle</Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>
    ),
  },
  {
    id: 'buttongroup--lg',
    component: 'ButtonGroup',
    label: 'lg',
    native: `<div class="btn-group btn-group-lg" role="group" aria-label="Large">${bgBtns(
      'secondary',
      ['Left', 'Middle', 'Right'],
    )}</div>`,
    styled: (
      <ButtonGroup size="lg" aria-label="Large">
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Middle</Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>
    ),
  },
  {
    id: 'buttongroup--vertical',
    component: 'ButtonGroup',
    label: 'vertical',
    native: `<div class="btn-group-vertical" role="group" aria-label="Vertical example">${bgBtns(
      'primary',
      ['Top', 'Middle', 'Bottom'],
    )}</div>`,
    styled: (
      <ButtonGroup vertical aria-label="Vertical example">
        <Button variant="primary">Top</Button>
        <Button variant="primary">Middle</Button>
        <Button variant="primary">Bottom</Button>
      </ButtonGroup>
    ),
  },
  {
    id: 'buttongroup--toolbar',
    component: 'ButtonGroup',
    label: 'toolbar',
    native: `<div class="btn-toolbar" role="toolbar" aria-label="Toolbar" style="gap: 0.5rem">
      <div class="btn-group" role="group" aria-label="First group">${bgBtns('primary', [
        '1',
        '2',
        '3',
      ])}</div>
      <div class="btn-group" role="group" aria-label="Second group">${bgBtns('secondary', [
        '4',
        '5',
      ])}</div>
    </div>`,
    styled: (
      <ButtonToolbar aria-label="Toolbar" style={{ gap: '0.5rem' }}>
        <ButtonGroup aria-label="First group">
          <Button variant="primary">1</Button>
          <Button variant="primary">2</Button>
          <Button variant="primary">3</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Second group">
          <Button variant="secondary">4</Button>
          <Button variant="secondary">5</Button>
        </ButtonGroup>
      </ButtonToolbar>
    ),
  },
]

// ---------------------------------------------------------------------------
// ListGroup — default · action states · flush · numbered · horizontal · variants
// ---------------------------------------------------------------------------
const listGroupCells: Cell[] = [
  {
    id: 'listgroup--default',
    component: 'ListGroup',
    label: 'default (active+disabled)',
    native: `<ul class="list-group" style="max-width: 400px">
      <li class="list-group-item active" aria-current="true">An active item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
      <li class="list-group-item disabled" aria-disabled="true">A disabled item</li>
    </ul>`,
    styled: (
      <ListGroup style={{ maxWidth: 400 }}>
        <ListGroupItem active>An active item</ListGroupItem>
        <ListGroupItem>A second item</ListGroupItem>
        <ListGroupItem>A third item</ListGroupItem>
        <ListGroupItem disabled>A disabled item</ListGroupItem>
      </ListGroup>
    ),
  },
  {
    id: 'listgroup--action',
    component: 'ListGroup',
    label: 'action (links)',
    native: `<div class="list-group" style="max-width: 400px">
      <a href="#" class="list-group-item list-group-item-action active" aria-current="true">The current link item</a>
      <a href="#" class="list-group-item list-group-item-action">A second link item</a>
      <a href="#" class="list-group-item list-group-item-action">A third link item</a>
      <a class="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
    </div>`,
    styled: (
      <ListGroup as="div" style={{ maxWidth: 400 }}>
        <ListGroupItem as="a" href="#" action active>
          The current link item
        </ListGroupItem>
        <ListGroupItem as="a" href="#" action>
          A second link item
        </ListGroupItem>
        <ListGroupItem as="a" href="#" action>
          A third link item
        </ListGroupItem>
        <ListGroupItem as="a" action disabled>
          A disabled link item
        </ListGroupItem>
      </ListGroup>
    ),
  },
  {
    id: 'listgroup--flush',
    component: 'ListGroup',
    label: 'flush',
    native: `<ul class="list-group list-group-flush" style="max-width: 400px">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>`,
    styled: (
      <ListGroup flush style={{ maxWidth: 400 }}>
        <ListGroupItem>An item</ListGroupItem>
        <ListGroupItem>A second item</ListGroupItem>
        <ListGroupItem>A third item</ListGroupItem>
      </ListGroup>
    ),
  },
  {
    id: 'listgroup--numbered',
    component: 'ListGroup',
    label: 'numbered',
    native: `<ol class="list-group list-group-numbered" style="max-width: 400px">
      <li class="list-group-item">First item</li>
      <li class="list-group-item">Second item</li>
      <li class="list-group-item">Third item</li>
    </ol>`,
    styled: (
      <ListGroup numbered style={{ maxWidth: 400 }}>
        <ListGroupItem>First item</ListGroupItem>
        <ListGroupItem>Second item</ListGroupItem>
        <ListGroupItem>Third item</ListGroupItem>
      </ListGroup>
    ),
  },
  {
    id: 'listgroup--horizontal',
    component: 'ListGroup',
    label: 'horizontal',
    native: `<ul class="list-group list-group-horizontal">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>`,
    styled: (
      <ListGroup horizontal>
        <ListGroupItem>An item</ListGroupItem>
        <ListGroupItem>A second item</ListGroupItem>
        <ListGroupItem>A third item</ListGroupItem>
      </ListGroup>
    ),
  },
  {
    id: 'listgroup--variants',
    component: 'ListGroup',
    label: 'contextual variants',
    note: 'contextual items remap --bs-list-group-* to the color -subtle/-emphasis tokens (styled reads runtime --bs-* var, falls back to 5.3.8 default).',
    native: `<ul class="list-group" style="max-width: 400px">
      <li class="list-group-item">A simple default list group item</li>
      <li class="list-group-item list-group-item-primary">A simple primary list group item</li>
      <li class="list-group-item list-group-item-success">A simple success list group item</li>
      <li class="list-group-item list-group-item-danger">A simple danger list group item</li>
    </ul>`,
    styled: (
      <ListGroup style={{ maxWidth: 400 }}>
        <ListGroupItem>A simple default list group item</ListGroupItem>
        <ListGroupItem variant="primary">A simple primary list group item</ListGroupItem>
        <ListGroupItem variant="success">A simple success list group item</ListGroupItem>
        <ListGroupItem variant="danger">A simple danger list group item</ListGroupItem>
      </ListGroup>
    ),
  },
]

// ---------------------------------------------------------------------------
// Placeholder — sizes xs/sm/lg/default · glow (static frame) · col-widths
// (animations frozen by the harness → glow rests at base opacity 0.5)
// ---------------------------------------------------------------------------
const phColStack = { width: '18rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' } as const

const placeholderCells: Cell[] = [
  {
    id: 'placeholder--sizes',
    component: 'Placeholder',
    label: 'sizes xs/sm/md/lg',
    native: `<div style="width: 18rem; display: flex; flex-direction: column; gap: 0.5rem">
      <span class="placeholder placeholder-xs col-12"></span>
      <span class="placeholder placeholder-sm col-12"></span>
      <span class="placeholder col-12"></span>
      <span class="placeholder placeholder-lg col-12"></span>
    </div>`,
    styled: (
      <div style={phColStack}>
        <Placeholder size="xs" col={12} />
        <Placeholder size="sm" col={12} />
        <Placeholder col={12} />
        <Placeholder size="lg" col={12} />
      </div>
    ),
  },
  {
    id: 'placeholder--widths',
    component: 'Placeholder',
    label: 'col widths',
    native: `<div style="width: 18rem; display: flex; flex-direction: column; gap: 0.5rem">
      <span class="placeholder col-6"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-8"></span>
    </div>`,
    styled: (
      <div style={phColStack}>
        <Placeholder col={6} />
        <Placeholder col={4} />
        <Placeholder col={8} />
      </div>
    ),
  },
  {
    id: 'placeholder--glow',
    component: 'Placeholder',
    label: 'glow (frozen frame)',
    note: 'animation frozen by the harness → glow rests at base opacity 0.5 on both sides.',
    native: `<div class="placeholder-glow" style="width: 18rem">
      <span class="placeholder col-7"></span> <span class="placeholder col-4"></span> <span class="placeholder col-4"></span> <span class="placeholder col-6"></span> <span class="placeholder col-8"></span>
    </div>`,
    styled: (
      <PlaceholderGlow style={{ width: '18rem' }}>
        <Placeholder col={7} /> <Placeholder col={4} /> <Placeholder col={4} />{' '}
        <Placeholder col={6} /> <Placeholder col={8} />
      </PlaceholderGlow>
    ),
  },
]

// ---------------------------------------------------------------------------
// Toast — shown (header + body + close) · container position (in a relative box)
// ---------------------------------------------------------------------------
const toastCells: Cell[] = [
  {
    id: 'toast--shown',
    component: 'Toast',
    label: 'shown (header+body+close)',
    note: 'close button: Bootstrap btn-close is an SVG background-image; styled CloseButton renders a × glyph (same pre-existing CloseButton gap).',
    native: `<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong style="margin-right: auto">Bootstrap</strong>
        <small style="color: var(--bs-secondary-color)">11 mins ago</small>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="toast-body">Hello, world! This is a toast message.</div>
    </div>`,
    styled: (
      <Toast>
        <ToastHeader>
          <strong style={{ marginRight: 'auto' }}>Bootstrap</strong>
          <small style={{ color: 'var(--bs-secondary-color)' }}>11 mins ago</small>
        </ToastHeader>
        <ToastBody>Hello, world! This is a toast message.</ToastBody>
      </Toast>
    ),
  },
  {
    id: 'toast--container',
    component: 'Toast',
    label: 'container top-end',
    note: 'container placed absolutely inside a relative box (viewport-fixed placement escapes the per-cell capture); styled position="top-end" overridden to absolute to match .position-absolute utilities.',
    native: `<div style="position: relative; width: 22rem; height: 9rem; background: #dee2e6; border-radius: 0.375rem">
      <div class="toast-container position-absolute top-0 end-0" style="padding: 1rem">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong style="margin-right: auto">Bootstrap</strong>
            <small style="color: var(--bs-secondary-color)">just now</small>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="toast-body">Positioned toast in a container.</div>
        </div>
      </div>
    </div>`,
    styled: (
      <div
        style={{
          position: 'relative',
          width: '22rem',
          height: '9rem',
          background: '#dee2e6',
          borderRadius: '0.375rem',
        }}
      >
        <ToastContainer position="top-end" style={{ position: 'absolute', padding: '1rem' }}>
          <Toast>
            <ToastHeader>
              <strong style={{ marginRight: 'auto' }}>Bootstrap</strong>
              <small style={{ color: 'var(--bs-secondary-color)' }}>just now</small>
            </ToastHeader>
            <ToastBody>Positioned toast in a container.</ToastBody>
          </Toast>
        </ToastContainer>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Collapse — the .show (expanded) static state
// ---------------------------------------------------------------------------
const collapseInner = {
  padding: '1rem',
  border: '1px solid #dee2e6',
  borderRadius: '0.375rem',
} as const
const collapseInnerStr = 'padding: 1rem; border: 1px solid #dee2e6; border-radius: 0.375rem'

const collapseCells: Cell[] = [
  {
    id: 'collapse--show',
    component: 'Collapse',
    label: 'expanded (show)',
    native: `<div style="width: 18rem">
      <div class="collapse show"><div style="${collapseInnerStr}">Some placeholder content for the collapse.</div></div>
    </div>`,
    styled: (
      <div style={{ width: '18rem' }}>
        <Collapse show>
          <div style={collapseInner}>Some placeholder content for the collapse.</div>
        </Collapse>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Scrollspy — static activeId highlighted nav (nav-pills + list-group variants)
// ---------------------------------------------------------------------------
const ssItems = [
  { id: 'ss-first', label: 'First' },
  { id: 'ss-second', label: 'Second' },
  { id: 'ss-third', label: 'Third' },
]

const scrollspyCells: Cell[] = [
  {
    id: 'scrollspy--nav',
    component: 'Scrollspy',
    label: 'nav (activeId)',
    native: `<ul class="nav nav-pills flex-column">
      <li class="nav-item"><a class="nav-link active" href="#ss-first" aria-current="true">First</a></li>
      <li class="nav-item"><a class="nav-link" href="#ss-second">Second</a></li>
      <li class="nav-item"><a class="nav-link" href="#ss-third">Third</a></li>
    </ul>`,
    styled: <ScrollspyNav activeId="ss-first" items={ssItems} variant="nav" />,
  },
  {
    id: 'scrollspy--list-group',
    component: 'Scrollspy',
    label: 'list-group (activeId)',
    note: 'Bootstrap scrollspy list-group uses .list-group-item-action (gray link color); ScrollspyNav renders plain body-color list items — a real minor color gap.',
    native: `<div class="list-group">
      <a href="#ss-first" class="list-group-item list-group-item-action active" aria-current="true">First</a>
      <a href="#ss-second" class="list-group-item list-group-item-action">Second</a>
      <a href="#ss-third" class="list-group-item list-group-item-action">Third</a>
    </div>`,
    styled: <ScrollspyNav activeId="ss-first" items={ssItems} variant="list-group" />,
  },
]

// ---------------------------------------------------------------------------
// Carousel — static activeIndex=0 (indicators + controls + caption) + dark
// ---------------------------------------------------------------------------
const CARO_COLORS = ['#6f42c1', '#0d6efd', '#198754']
const slideStyleStr = (color: string) =>
  `height: 320px; display: flex; align-items: center; justify-content: center; background: ${color}; color: #fff; font-size: 2rem`
const slideStyle = (color: string) =>
  ({
    height: '320px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: color,
    color: '#fff',
    fontSize: '2rem',
  }) as const

const nativeCarousel = (dark: boolean): string => `<div style="width: 640px"><div class="carousel slide${
  dark ? ' carousel-dark' : ''
}">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    ${CARO_COLORS.map(
      (c, i) => `<div class="carousel-item${i === 0 ? ' active' : ''}">
      <div style="${slideStyleStr(c)}">Slide ${i + 1}</div>
      <div class="carousel-caption"><h5>Slide ${i + 1} label</h5><p>Some representative placeholder content.</p></div>
    </div>`,
    ).join('')}
  </div>
  <button class="carousel-control-prev" type="button">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div></div>`

const styledCarousel = (dark: boolean) => (
  <div style={{ width: 640 }}>
    <Carousel activeIndex={0} dark={dark}>
      {CARO_COLORS.map((c, i) => (
        <CarouselItem key={i}>
          <div style={slideStyle(c)}>Slide {i + 1}</div>
          <CarouselCaption>
            <h5>Slide {i + 1} label</h5>
            <p>Some representative placeholder content.</p>
          </CarouselCaption>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

const carouselCells: Cell[] = [
  {
    id: 'carousel--slide',
    component: 'Carousel',
    label: 'slide 1 (indicators+controls+caption)',
    note: 'control icons are the verbatim 5.3.8 SVG data-URIs; caption h5/p use default browser margins (styled side has no Reboot reset).',
    native: nativeCarousel(false),
    styled: styledCarousel(false),
  },
  {
    id: 'carousel--dark',
    component: 'Carousel',
    label: 'dark variant',
    native: nativeCarousel(true),
    styled: styledCarousel(true),
  },
]

// ===========================================================================
// OVERLAY CELLS (shown-state, ISOLATED capture) — Q2 harness extension.
//
// The 5 overlays portal (FloatingPortal) to <body> and lay out fixed/absolute,
// so they escape the per-cell [data-cell-id] box the grid runner screenshots.
// Instead each overlay cell is rendered ALONE on its own route
// (`?overlay=<id>&side=<side>`, see main.tsx) and the runner clips a tight
// region around the floating element itself (`shot` selector) with a uniform
// margin, so shadow + arrow + backdrop fall inside the frame. Both sides are
// clipped element-relative, so absolute placement need not match between sides
// (placement parity is asserted separately in the behavioral tests). These
// cells are NOT part of `cells` — the 183 grid cells render/measure unchanged.
//
// `shot` is a role-based selector present on BOTH sides (native markup carries
// the matching role; styled gets it from @floating-ui useRole).
// ===========================================================================
export interface OverlayCell {
  id: string
  component: string
  label: string
  note?: string
  /** Selector for the floating element to clip + axe (works on both sides). */
  shot: string
  /** Raw Bootstrap markup (oracle side), positioned statically. */
  native: string
  /** Equivalent bootstrap-styled node, forced shown. */
  styled: React.ReactNode
}

// Fixed wrapper that keeps referenceless native floating markup on-screen and
// clear of the viewport edges (arrow/shadow have room on every side).
const floatWrap = (inner: string) =>
  `<div style="position:fixed;top:420px;left:460px">${inner}</div>`

const noop = () => {}

const overlayCells: OverlayCell[] = [
  // ---- Modal (header/body/footer + backdrop) --------------------------------
  {
    id: 'modal--basic',
    component: 'Modal',
    label: 'shown (header/body/footer + backdrop)',
    note: 'native = static .modal.show + .modal-backdrop.show; clip captures dialog box + shadow over the 50% backdrop.',
    shot: '[role="dialog"][aria-modal="true"]',
    native: `<div class="modal-backdrop show"></div>
      <div class="modal show" style="display:block">
        <div class="modal-dialog">
          <div class="modal-content" role="dialog" aria-modal="true" aria-label="Modal">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="modal-body"><p>Modal body content goes here.</p></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>`,
    styled: (
      <Modal show onHide={noop}>
        <ModalHeader>
          <ModalTitle>Modal title</ModalTitle>
          <CloseButton aria-label="Close" />
        </ModalHeader>
        <ModalBody>
          <p>Modal body content goes here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </ModalFooter>
      </Modal>
    ),
  },
  // ---- Offcanvas (start, shown) --------------------------------------------
  {
    id: 'offcanvas--start',
    component: 'Offcanvas',
    label: 'shown from start (+ backdrop)',
    note: 'native = static .offcanvas.offcanvas-start.show + backdrop; panel spans the left edge, clip clamped to viewport.',
    shot: '[role="dialog"][aria-modal="true"]',
    native: `<div class="offcanvas-backdrop show"></div>
      <div class="offcanvas offcanvas-start show" style="visibility:visible;transform:none" role="dialog" aria-modal="true" aria-label="Offcanvas">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Offcanvas</h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body"><p>Offcanvas body content.</p></div>
      </div>`,
    styled: (
      <Offcanvas show onHide={noop} placement="start">
        <OffcanvasHeader>
          <OffcanvasTitle>Offcanvas</OffcanvasTitle>
          <CloseButton aria-label="Close" />
        </OffcanvasHeader>
        <OffcanvasBody>
          <p>Offcanvas body content.</p>
        </OffcanvasBody>
      </Offcanvas>
    ),
  },
  // ---- Dropdown (menu open) -------------------------------------------------
  {
    id: 'dropdown--open',
    component: 'Dropdown',
    label: 'menu open (items + divider)',
    note: 'native = static .dropdown-menu.show; default dropdown menu carries no box-shadow.',
    shot: '[role="menu"]',
    native: floatWrap(`<div class="dropdown">
        <div class="dropdown-menu show" role="menu" style="position:static;display:block">
          <button class="dropdown-item" type="button" role="menuitem">Action</button>
          <button class="dropdown-item" type="button" role="menuitem">Another action</button>
          <hr class="dropdown-divider">
          <button class="dropdown-item" type="button" role="menuitem">Separated link</button>
        </div>
      </div>`),
    styled: (
      <div style={{ position: 'fixed', top: 420, left: 460 }}>
        <Dropdown defaultOpen>
          {/* Trigger hidden: it only anchors placement; native renders no trigger. */}
          <DropdownToggle style={{ visibility: 'hidden' }}>Menu</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another action</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    ),
  },
  // ---- Tooltip (shown, top) -------------------------------------------------
  {
    id: 'tooltip--top',
    component: 'Tooltip',
    label: 'shown top (arrow)',
    note: 'native = static .tooltip.show.bs-tooltip-top; .tooltip carries opacity 0.9 incl. arrow.',
    shot: '[role="tooltip"]',
    native: floatWrap(`<div class="tooltip show bs-tooltip-top" role="tooltip" style="position:relative;display:inline-block">
        <div class="tooltip-arrow" style="position:absolute;left:calc(50% - 0.4rem)"></div>
        <div class="tooltip-inner">Tooltip text</div>
      </div>`),
    styled: (
      <div style={{ position: 'fixed', top: 420, left: 460 }}>
        <Tooltip content="Tooltip text" placement="top" defaultOpen>
          <button type="button" className="btn btn-secondary" style={{ visibility: 'hidden' }}>
            Trigger
          </button>
        </Tooltip>
      </div>
    ),
  },
  // ---- Popover (shown, top, title + body) -----------------------------------
  {
    id: 'popover--top',
    component: 'Popover',
    label: 'shown top (title + body + arrow)',
    note: 'native = static .popover.bs-popover-top; two-layer arrow (::before border + ::after fill).',
    shot: '[role="dialog"]',
    native: floatWrap(`<div class="popover bs-popover-top" role="dialog" style="position:relative;display:inline-block">
        <div class="popover-arrow" style="position:absolute;bottom:calc(-0.5rem - 1px);left:calc(50% - 0.5rem)"></div>
        <div class="popover-header">Popover title</div>
        <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
      </div>`),
    styled: (
      <div style={{ position: 'fixed', top: 420, left: 460 }}>
        <Popover
          title="Popover title"
          content="And here's some amazing content. It's very engaging. Right?"
          placement="top"
          defaultOpen
        >
          <button type="button" className="btn btn-secondary" style={{ visibility: 'hidden' }}>
            Trigger
          </button>
        </Popover>
      </div>
    ),
  },
]

export { overlayCells }

// ---------------------------------------------------------------------------
// Grid — cols (equal+span) · offset · order · row-cols-3 · gutter · container
// Each demo is wrapped in a FIXED-WIDTH box so col percentages render
// deterministically regardless of the harness viewport. Cols carry a colored
// inner box (identical both sides) so their geometry is visible to the diff.
// ---------------------------------------------------------------------------
const gBoxStr = 'padding:0.75rem;background:#cfe2ff;border:1px solid #9ec5fe;border-radius:0.25rem'
const gBox = {
  padding: '0.75rem',
  background: '#cfe2ff',
  border: '1px solid #9ec5fe',
  borderRadius: '0.25rem',
} as const
const gWrapStr = (w: number) => `width:${w}px`
const gWrap = (w: number) => ({ width: `${w}px` }) as const

const gridCells: Cell[] = [
  {
    id: 'grid--cols',
    component: 'Grid',
    label: 'row cols (equal + col-6)',
    native: `<div style="${gWrapStr(600)}"><div class="row">
      <div class="col"><div style="${gBoxStr}">.col</div></div>
      <div class="col-6"><div style="${gBoxStr}">.col-6</div></div>
      <div class="col"><div style="${gBoxStr}">.col</div></div>
    </div></div>`,
    styled: (
      <div style={gWrap(600)}>
        <Row>
          <Col>
            <div style={gBox}>.col</div>
          </Col>
          <Col span={6}>
            <div style={gBox}>.col-6</div>
          </Col>
          <Col>
            <div style={gBox}>.col</div>
          </Col>
        </Row>
      </div>
    ),
  },
  {
    id: 'grid--offset',
    component: 'Grid',
    label: 'offset-4',
    native: `<div style="${gWrapStr(600)}"><div class="row">
      <div class="col-4 offset-4"><div style="${gBoxStr}">.col-4 .offset-4</div></div>
    </div></div>`,
    styled: (
      <div style={gWrap(600)}>
        <Row>
          <Col span={4} offset={4}>
            <div style={gBox}>.col-4 .offset-4</div>
          </Col>
        </Row>
      </div>
    ),
  },
  {
    id: 'grid--order',
    component: 'Grid',
    label: 'order (DOM 1,2 → visual 2,1)',
    native: `<div style="${gWrapStr(600)}"><div class="row">
      <div class="col order-2"><div style="${gBoxStr}">DOM 1 / order-2</div></div>
      <div class="col order-1"><div style="${gBoxStr}">DOM 2 / order-1</div></div>
    </div></div>`,
    styled: (
      <div style={gWrap(600)}>
        <Row>
          <Col order={2}>
            <div style={gBox}>DOM 1 / order-2</div>
          </Col>
          <Col order={1}>
            <div style={gBox}>DOM 2 / order-1</div>
          </Col>
        </Row>
      </div>
    ),
  },
  {
    id: 'grid--row-cols-3',
    component: 'Grid',
    label: 'row-cols-3 (5 items wrap)',
    native: `<div style="${gWrapStr(600)}"><div class="row row-cols-3">
      ${[1, 2, 3, 4, 5]
        .map((n) => `<div class="col"><div style="${gBoxStr}">item ${n}</div></div>`)
        .join('')}
    </div></div>`,
    styled: (
      <div style={gWrap(600)}>
        <Row cols={3}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Col key={n}>
              <div style={gBox}>item {n}</div>
            </Col>
          ))}
        </Row>
      </div>
    ),
  },
  {
    id: 'grid--gutter-g4',
    component: 'Grid',
    label: 'gutter g-4',
    native: `<div style="${gWrapStr(600)}"><div class="row g-4 row-cols-2">
      ${[1, 2, 3, 4]
        .map((n) => `<div class="col"><div style="${gBoxStr}">g-4 ${n}</div></div>`)
        .join('')}
    </div></div>`,
    styled: (
      <div style={gWrap(600)}>
        <Row g={4} cols={2}>
          {[1, 2, 3, 4].map((n) => (
            <Col key={n}>
              <div style={gBox}>g-4 {n}</div>
            </Col>
          ))}
        </Row>
      </div>
    ),
  },
  {
    id: 'grid--container-fluid',
    component: 'Grid',
    label: 'container-fluid',
    native: `<div style="${gWrapStr(400)}"><div class="container-fluid"><div style="${gBoxStr}">.container-fluid</div></div></div>`,
    styled: (
      <div style={gWrap(400)}>
        <Container fluid>
          <div style={gBox}>.container-fluid</div>
        </Container>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Ratio — 16x9 + 1x1 (bordered child so the positioned box is visible)
// ---------------------------------------------------------------------------
const ratioChildStr = 'border:2px solid #0d6efd;background:rgba(13,110,253,0.1)'
const ratioChild = { border: '2px solid #0d6efd', background: 'rgba(13,110,253,0.1)' } as const

const ratioCells: Cell[] = [
  {
    id: 'ratio--16x9',
    component: 'Ratio',
    label: '16x9',
    native: `<div style="width:320px"><div class="ratio ratio-16x9"><div style="${ratioChildStr}"></div></div></div>`,
    styled: (
      <div style={{ width: 320 }}>
        <Ratio ratio="16x9">
          <div style={ratioChild} />
        </Ratio>
      </div>
    ),
  },
  {
    id: 'ratio--1x1',
    component: 'Ratio',
    label: '1x1',
    native: `<div style="width:200px"><div class="ratio ratio-1x1"><div style="${ratioChildStr}"></div></div></div>`,
    styled: (
      <div style={{ width: 200 }}>
        <Ratio ratio="1x1">
          <div style={ratioChild} />
        </Ratio>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Typography — display · lead · h1-look-on-p · blockquote+footer · inline list
// ---------------------------------------------------------------------------
const typographyCells: Cell[] = [
  {
    id: 'typography--display-1',
    component: 'Typography',
    label: 'display-1',
    native: `<h1 class="display-1">Display 1</h1>`,
    styled: <Display size={1}>Display 1</Display>,
  },
  {
    id: 'typography--display-4',
    component: 'Typography',
    label: 'display-4',
    native: `<h1 class="display-4">Display 4</h1>`,
    styled: <Display size={4}>Display 4</Display>,
  },
  {
    id: 'typography--lead',
    component: 'Typography',
    label: 'lead',
    native: `<div style="width:24rem"><p class="lead">This is a lead paragraph. It stands out from regular paragraphs.</p></div>`,
    styled: (
      <div style={{ width: '24rem' }}>
        <Lead>This is a lead paragraph. It stands out from regular paragraphs.</Lead>
      </div>
    ),
  },
  {
    id: 'typography--h1-on-p',
    component: 'Typography',
    label: '.h1 look on <p>',
    native: `<p class="h1">h1 look on a p</p>`,
    styled: (
      <Heading as="p" size={1}>
        h1 look on a p
      </Heading>
    ),
  },
  {
    id: 'typography--blockquote',
    component: 'Typography',
    label: 'blockquote + footer',
    native: `<div style="width:24rem">
      <blockquote class="blockquote"><p>A well-known quote, contained in a blockquote element.</p></blockquote>
      <footer class="blockquote-footer">Someone famous</footer>
    </div>`,
    styled: (
      <div style={{ width: '24rem' }}>
        <Blockquote>
          <p>A well-known quote, contained in a blockquote element.</p>
        </Blockquote>
        <BlockquoteFooter>Someone famous</BlockquoteFooter>
      </div>
    ),
  },
  {
    id: 'typography--inline-list',
    component: 'Typography',
    label: 'inline list',
    native: `<ul class="list-inline"><li class="list-inline-item">First</li><li class="list-inline-item">Second</li><li class="list-inline-item">Third</li></ul>`,
    styled: (
      <List inline>
        <ListInlineItem>First</ListInlineItem>
        <ListInlineItem>Second</ListInlineItem>
        <ListInlineItem>Third</ListInlineItem>
      </List>
    ),
  },
]

// ---------------------------------------------------------------------------
// Table — base · striped · bordered · sm · hover · variant · active row · dark
// ---------------------------------------------------------------------------
const TABLE_ROWS: Array<[string, string, string]> = [
  ['1', 'Mark', 'Otto'],
  ['2', 'Jacob', 'Thornton'],
  ['3', 'Larry', 'Bird'],
]
const nativeTable = (cls = '', opts: { activeRow?: number; theme?: string } = {}) =>
  `<div style="width:28rem"><table class="table${cls}"${
    opts.theme ? ` data-bs-theme="${opts.theme}"` : ''
  }>
    <thead><tr><th scope="col">#</th><th scope="col">First</th><th scope="col">Last</th></tr></thead>
    <tbody>
      ${TABLE_ROWS.map(
        (r, i) =>
          `<tr${opts.activeRow === i ? ' class="table-active"' : ''}><th scope="row">${
            r[0]
          }</th><td>${r[1]}</td><td>${r[2]}</td></tr>`,
      ).join('')}
    </tbody>
  </table></div>`

const StyledTableBody = ({ activeRow }: { activeRow?: number } = {}) => (
  <>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
      </tr>
    </thead>
    <tbody>
      {TABLE_ROWS.map((r, i) => (
        <tr key={r[0]} className={activeRow === i ? 'table-active' : undefined}>
          <th scope="row">{r[0]}</th>
          <td>{r[1]}</td>
          <td>{r[2]}</td>
        </tr>
      ))}
    </tbody>
  </>
)

const tableCells: Cell[] = [
  {
    id: 'table--base',
    component: 'Table',
    label: 'base',
    native: nativeTable(),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table>{StyledTableBody()}</Table>
      </div>
    ),
  },
  {
    id: 'table--striped',
    component: 'Table',
    label: 'striped',
    native: nativeTable(' table-striped'),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table striped>{StyledTableBody()}</Table>
      </div>
    ),
  },
  {
    id: 'table--bordered',
    component: 'Table',
    label: 'bordered',
    native: nativeTable(' table-bordered'),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table bordered>{StyledTableBody()}</Table>
      </div>
    ),
  },
  {
    id: 'table--sm',
    component: 'Table',
    label: 'sm',
    native: nativeTable(' table-sm'),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table size="sm">{StyledTableBody()}</Table>
      </div>
    ),
  },
  {
    id: 'table--hover',
    component: 'Table',
    label: 'hover (static, at rest)',
    note: 'hover accent only appears on :hover; captured statically at rest → both sides render the base table.',
    native: nativeTable(' table-hover'),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table hover>{StyledTableBody()}</Table>
      </div>
    ),
  },
  {
    id: 'table--primary',
    component: 'Table',
    label: 'variant primary',
    native: nativeTable(' table-primary'),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table variant="primary">{StyledTableBody()}</Table>
      </div>
    ),
  },
  {
    id: 'table--active-row',
    component: 'Table',
    label: 'active row (row 2)',
    native: nativeTable('', { activeRow: 1 }),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table>{StyledTableBody({ activeRow: 1 })}</Table>
      </div>
    ),
  },
  {
    id: 'table--dark',
    component: 'Table',
    label: 'dark + striped (emphasis-rgb fix)',
    note: 'exercises the dark-mode striping fix: --bs-emphasis-color-rgb now emits 255,255,255 under [data-bs-theme=dark] so the striped accent matches the oracle.',
    native: nativeTable(' table-striped', { theme: 'dark' }),
    styled: (
      <div style={{ width: '28rem' }}>
        <Table striped data-bs-theme="dark">
          {StyledTableBody()}
        </Table>
      </div>
    ),
  },
]

// ---------------------------------------------------------------------------
// Image — thumbnail · rounded (inline-SVG data-URI src → deterministic)
// ---------------------------------------------------------------------------
const IMG_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='100'%3E%3Crect width='140' height='100' fill='%230d6efd'/%3E%3Ccircle cx='70' cy='50' r='30' fill='%23ffc107'/%3E%3C/svg%3E"

const imageCells: Cell[] = [
  {
    id: 'image--thumbnail',
    component: 'Image',
    label: 'thumbnail',
    native: `<img src="${IMG_SRC}" width="140" height="100" class="img-thumbnail" alt="swatch">`,
    styled: <Image src={IMG_SRC} width={140} height={100} thumbnail alt="swatch" />,
  },
  {
    id: 'image--rounded',
    component: 'Image',
    label: 'rounded',
    native: `<img src="${IMG_SRC}" width="140" height="100" class="rounded" alt="swatch">`,
    styled: <Image src={IMG_SRC} width={140} height={100} rounded alt="swatch" />,
  },
]

// ---------------------------------------------------------------------------
// Figure — figure + img + caption
// ---------------------------------------------------------------------------
const figureCells: Cell[] = [
  {
    id: 'figure--basic',
    component: 'Figure',
    label: 'figure + img + caption',
    native: `<figure class="figure">
      <img src="${IMG_SRC}" width="140" height="100" class="figure-img" alt="swatch">
      <figcaption class="figure-caption">A caption for the above image.</figcaption>
    </figure>`,
    styled: (
      <Figure>
        <FigureImage src={IMG_SRC} width={140} height={100} alt="swatch" />
        <FigureCaption>A caption for the above image.</FigureCaption>
      </Figure>
    ),
  },
]

// ---------------------------------------------------------------------------
// Forms — controls (FormControl · FormSelect · FormCheck · FormRange) +
// composition (InputGroup · FloatingLabel · FormFeedback). Each cell maps to
// the exact native Bootstrap 5.3.8 markup. Filled/checked states use static
// `value`/`checked` (native) ↔ `defaultValue`/`defaultChecked` (styled) so both
// sides render identical, deterministic pixels at the fixed viewport.
// ---------------------------------------------------------------------------
const SELECT_OPTS = `<option>One</option><option>Two</option><option>Three</option>`
const formCells: Cell[] = [
  // ── FormControl ──
  {
    id: 'form-control--default',
    component: 'FormControl',
    label: 'default',
    native: `<input type="text" class="form-control" value="Text">`,
    styled: <FormControl type="text" defaultValue="Text" />,
  },
  {
    id: 'form-control--sm',
    component: 'FormControl',
    label: 'sm',
    native: `<input type="text" class="form-control form-control-sm" value="Text">`,
    styled: <FormControl type="text" size="sm" defaultValue="Text" />,
  },
  {
    id: 'form-control--lg',
    component: 'FormControl',
    label: 'lg',
    native: `<input type="text" class="form-control form-control-lg" value="Text">`,
    styled: <FormControl type="text" size="lg" defaultValue="Text" />,
  },
  {
    id: 'form-control--disabled',
    component: 'FormControl',
    label: 'disabled',
    native: `<input type="text" class="form-control" value="Text" disabled>`,
    styled: <FormControl type="text" defaultValue="Text" disabled />,
  },
  {
    id: 'form-control--is-invalid',
    component: 'FormControl',
    label: 'is-invalid',
    native: `<input type="text" class="form-control is-invalid" value="Text">`,
    styled: <FormControl type="text" defaultValue="Text" isInvalid />,
  },
  // ── FormSelect ──
  {
    id: 'form-select--default',
    component: 'FormSelect',
    label: 'default',
    native: `<select class="form-select">${SELECT_OPTS}</select>`,
    styled: (
      <FormSelect defaultValue="One">
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </FormSelect>
    ),
  },
  {
    id: 'form-select--sm',
    component: 'FormSelect',
    label: 'sm',
    native: `<select class="form-select form-select-sm">${SELECT_OPTS}</select>`,
    styled: (
      <FormSelect size="sm" defaultValue="One">
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </FormSelect>
    ),
  },
  // ── FormCheck ──
  {
    id: 'form-check--checkbox',
    component: 'FormCheck',
    label: 'checkbox',
    native: `<div class="form-check">
      <input class="form-check-input" type="checkbox" id="fc-cb" checked>
      <label class="form-check-label" for="fc-cb">Check me</label>
    </div>`,
    styled: <FormCheck type="checkbox" id="fc-cb" label="Check me" defaultChecked />,
  },
  {
    id: 'form-check--radio',
    component: 'FormCheck',
    label: 'radio',
    native: `<div class="form-check">
      <input class="form-check-input" type="radio" name="fc-r" id="fc-rd" checked>
      <label class="form-check-label" for="fc-rd">Radio</label>
    </div>`,
    styled: <FormCheck type="radio" name="fc-r" id="fc-rd" label="Radio" defaultChecked />,
  },
  {
    id: 'form-check--switch',
    component: 'FormCheck',
    label: 'switch',
    native: `<div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="fc-sw" checked>
      <label class="form-check-label" for="fc-sw">Switch</label>
    </div>`,
    styled: <FormCheck type="switch" id="fc-sw" label="Switch" defaultChecked />,
  },
  {
    id: 'form-check--inline',
    component: 'FormCheck',
    label: 'inline',
    native: `<div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="fc-in" checked>
      <label class="form-check-label" for="fc-in">Inline</label>
    </div>`,
    styled: <FormCheck type="checkbox" id="fc-in" label="Inline" inline defaultChecked />,
  },
  // ── FormRange ──
  {
    id: 'form-range--default',
    component: 'FormRange',
    label: 'default',
    native: `<input type="range" class="form-range" min="0" max="100" value="50">`,
    styled: <FormRange min={0} max={100} defaultValue={50} />,
  },
  // ── InputGroup ──
  {
    id: 'input-group--prepend-text',
    component: 'InputGroup',
    label: 'prepend text',
    native: `<div class="input-group">
      <span class="input-group-text">@</span>
      <input type="text" class="form-control" value="Text">
    </div>`,
    styled: (
      <InputGroup>
        <InputGroupText>@</InputGroupText>
        <FormControl type="text" defaultValue="Text" />
      </InputGroup>
    ),
  },
  {
    id: 'input-group--button',
    component: 'InputGroup',
    label: 'button',
    native: `<div class="input-group">
      <button class="btn btn-outline-secondary" type="button">Button</button>
      <input type="text" class="form-control" value="Text">
    </div>`,
    styled: (
      <InputGroup>
        <Button variant="outline-secondary">Button</Button>
        <FormControl type="text" defaultValue="Text" />
      </InputGroup>
    ),
  },
  {
    id: 'input-group--sm',
    component: 'InputGroup',
    label: 'sm',
    native: `<div class="input-group input-group-sm">
      <span class="input-group-text">@</span>
      <input type="text" class="form-control" value="Text">
    </div>`,
    styled: (
      <InputGroup size="sm">
        <InputGroupText>@</InputGroupText>
        <FormControl type="text" defaultValue="Text" />
      </InputGroup>
    ),
  },
  {
    id: 'input-group--lg',
    component: 'InputGroup',
    label: 'lg',
    native: `<div class="input-group input-group-lg">
      <span class="input-group-text">@</span>
      <input type="text" class="form-control" value="Text">
    </div>`,
    styled: (
      <InputGroup size="lg">
        <InputGroupText>@</InputGroupText>
        <FormControl type="text" defaultValue="Text" />
      </InputGroup>
    ),
  },
  // ── FloatingLabel (filled) ──
  {
    id: 'floating-label--filled',
    component: 'FloatingLabel',
    label: 'filled',
    native: `<div class="form-floating">
      <input type="text" class="form-control" id="fl-name" placeholder="Name" value="Filled">
      <label for="fl-name">Name</label>
    </div>`,
    styled: (
      <FloatingLabel label="Name" controlId="fl-name">
        <FormControl type="text" placeholder="Name" defaultValue="Filled" />
      </FloatingLabel>
    ),
  },
  // ── FormFeedback (is-invalid input + shown invalid-feedback) ──
  {
    id: 'form-feedback--invalid',
    component: 'FormFeedback',
    label: 'is-invalid + invalid-feedback',
    native: `<div>
      <input type="text" class="form-control is-invalid" value="Text">
      <div class="invalid-feedback">Please provide a valid value.</div>
    </div>`,
    styled: (
      <div>
        <FormControl type="text" defaultValue="Text" isInvalid />
        <FormFeedback type="invalid">Please provide a valid value.</FormFeedback>
      </div>
    ),
  },
]

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
  ...buttonGroupCells,
  ...listGroupCells,
  ...placeholderCells,
  ...toastCells,
  ...collapseCells,
  ...scrollspyCells,
  ...carouselCells,
  ...gridCells,
  ...ratioCells,
  ...typographyCells,
  ...tableCells,
  ...imageCells,
  ...figureCells,
  ...formCells,
]

/** Distinct component names in fixture order (for scorecard grouping). */
export const componentOrder: string[] = cells.reduce<string[]>((acc, c) => {
  if (!acc.includes(c.component)) acc.push(c.component)
  return acc
}, [])
