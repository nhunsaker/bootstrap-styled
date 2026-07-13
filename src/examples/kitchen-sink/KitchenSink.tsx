import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  ListGroupItem,
  Alert,
  Tabs,
  Tab,
  Pagination,
  PageItem,
  PageLink,
  Dropdown,
  DropdownToggle,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  CloseButton,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  BsIconChevronDown,
  BsIconPlus,
  BsIconTrash,
  BsIconStar,
  BsIconCheck,
} from '../../index'

/**
 * KitchenSink — the "everything on one page" proof, built entirely from
 * bootstrap-styled components laid out in the Grid. It exercises the §4 P5
 * named surfaces (dropdowns · list groups · modals · badges · breadcrumbs ·
 * buttons) plus cards, alerts, nav/tabs, pagination and forms.
 *
 * This is the styled twin; `KitchenSink.native.tsx` is the raw-Bootstrap-markup
 * twin with the SAME intended DOM. Under the oracle CSS + Provider tokens the
 * two pixel-diff cleanly (component-by-component parity is already proven in the
 * parity harness).
 *
 * Static-cell caveats (behavior is out of scope for a pixel page):
 *  - Modal is rendered as a shown `.modal-dialog` inline — no portal / backdrop
 *    / focus-trap. CloseButton draws a × glyph vs Bootstrap's SVG btn-close (the
 *    known CloseButton gap), so that one glyph will not diff perfectly.
 *  - Dropdown is shown in its closed (toggle-only) state — the open menu portals
 *    and would escape the page capture.
 */
export function KitchenSink() {
  return (
    <Container>
      <Row g={4}>
        {/* Buttons ------------------------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>Buttons</CardHeader>
            <CardBody>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Button variant="outline-primary">Outline</Button>
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <Button variant="primary">
                  <BsIconPlus size={16} /> New
                </Button>
                <Button variant="outline-danger">
                  <BsIconTrash size={16} /> Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Badges & Breadcrumbs ----------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>Badges & breadcrumbs</CardHeader>
            <CardBody>
              <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="primary" pill>
                  <BsIconStar size={12} /> Pill
                </Badge>
              </div>
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
            </CardBody>
          </Card>
        </Col>

        {/* Alerts ------------------------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>Alerts</CardHeader>
            <CardBody>
              <Alert variant="success">
                <BsIconCheck size={16} /> Your token was saved.
              </Alert>
              <Alert variant="warning">Heads up — this preview is unpublished.</Alert>
              <div className="mb-0">
                <Alert variant="danger" style={{ marginBottom: 0 }}>
                  Something went wrong. Please try again.
                </Alert>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* List group --------------------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>List group</CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem active>An active item</ListGroupItem>
                <ListGroupItem>A second item</ListGroupItem>
                <ListGroupItem>A third item</ListGroupItem>
                <ListGroupItem variant="success">A success item</ListGroupItem>
                <ListGroupItem disabled>A disabled item</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>

        {/* Dropdown & Pagination --------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>Dropdown & pagination</CardHeader>
            <CardBody>
              <div className="mb-3">
                <Dropdown>
                  <DropdownToggle variant="secondary">
                    Dropdown <BsIconChevronDown size={14} />
                  </DropdownToggle>
                </Dropdown>
              </div>
              <nav aria-label="Page navigation">
                <Pagination>
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
              </nav>
            </CardBody>
          </Card>
        </Col>

        {/* Nav / Tabs --------------------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>Nav / tabs</CardHeader>
            <CardBody>
              <Tabs defaultActiveKey="home">
                <Tab eventKey="home" title="Home">
                  Home panel content.
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  Profile panel content.
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  Contact panel content.
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </Col>

        {/* Form --------------------------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>Form</CardHeader>
            <CardBody>
              <div className="mb-3">
                <FormLabel htmlFor="ks-email">Email address</FormLabel>
                <FormControl id="ks-email" type="email" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <FormLabel htmlFor="ks-pref">Preference</FormLabel>
                <FormSelect id="ks-pref" defaultValue="1">
                  <option value="1">Tokens</option>
                  <option value="2">Components</option>
                  <option value="3">Both</option>
                </FormSelect>
              </div>
              <FormCheck id="ks-check" label="Send me updates" className="mb-3" />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </CardBody>
          </Card>
        </Col>

        {/* Modal (static, shown) --------------------------------------- */}
        <Col md={6}>
          <Card>
            <CardHeader>Modal (static)</CardHeader>
            <CardBody>
              {/* `.modal` hosts the --bs-modal-* vars + `.modal-content` supplies
                  the box chrome (bg/border/radius); both come from Bootstrap's CSS
                  (harness oracle / host app). Our ModalHeader/Body/Footer provide
                  their own padding + separators. Neutralize `.modal`'s fixed
                  full-screen layout so it sits inline in the static page. */}
              <div
                className="modal"
                style={{ position: 'static', display: 'block', width: 'auto', height: 'auto' }}
              >
                <div className="modal-dialog" style={{ margin: 0, maxWidth: '100%' }}>
                  <div className="modal-content">
                    <ModalHeader>
                      <ModalTitle>Save changes?</ModalTitle>
                      <CloseButton aria-label="Close" />
                    </ModalHeader>
                    <ModalBody>
                      <p className="mb-0">Your changes will be applied to the live preview.</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="secondary">Close</Button>
                      <Button variant="primary">Save changes</Button>
                    </ModalFooter>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
KitchenSink.displayName = 'KitchenSink'
