import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BootstrapStyledProvider, createTheme,
  Button, Badge, Alert, Spinner,
  Card, CardBody, CardTitle, CardText,
  Container, Row, Col, Stack,
  FormControl, FormSelect, FormCheck, FormLabel, FormGroup, InputGroup, InputGroupText,
  Navbar, NavbarBrand, Nav, NavItem, NavLink,
  Breadcrumb, BreadcrumbItem,
  Pagination, PageItem, PageLink,
  Progress, ProgressBar,
  type ColorName,
} from '../src'

const COLORS: ColorName[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: '1.5rem 0', borderTop: '1px solid var(--bs-border-color)' }}>
      <h2 style={{ fontSize: '1.1rem' }}>{title}</h2>
      {children}
    </section>
  )
}

function App() {
  const [primary, setPrimary] = useState('#0d6efd')
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const theme = createTheme({ colors: { primary } })

  return (
    <BootstrapStyledProvider theme={theme} colorMode={mode}>
      <Container style={{ paddingTop: 24, paddingBottom: 48 }}>
        <h1>bootstrap-styled — review</h1>
        <Stack direction="horizontal" gap={3}>
          <FormLabel style={{ margin: 0 }}>Primary</FormLabel>
          <input
            type="color"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
            style={{
              width: 44,
              height: 28,
              padding: 2,
              border: '1px solid var(--bs-border-color)',
              borderRadius: 'var(--bs-border-radius)',
              background: 'var(--bs-body-bg)',
              cursor: 'pointer',
            }}
          />
          <Button size="sm" variant="secondary" onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}>
            Mode: {mode}
          </Button>
          <span style={{ color: 'var(--bs-secondary)' }}>
            ← change primary or mode; everything re-skins live (color-mix + contrast).
          </span>
        </Stack>

        <Section title="Navbar / Nav / Breadcrumb">
          <Navbar variant="primary" style={{ borderRadius: 'var(--bs-border-radius)', marginBottom: 16 }}>
            <NavbarBrand href="#">🌳 Brand</NavbarBrand>
            <Nav>
              <NavItem><NavLink href="#" active>Home</NavLink></NavItem>
              <NavItem><NavLink href="#">Features</NavLink></NavItem>
              <NavItem><NavLink href="#" disabled>Disabled</NavLink></NavItem>
            </Nav>
          </Navbar>
          <Breadcrumb>
            <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
            <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
            <BreadcrumbItem active>Data</BreadcrumbItem>
          </Breadcrumb>
        </Section>

        <Section title="Pagination / Progress">
          <Pagination style={{ marginBottom: 16 }}>
            <PageItem><PageLink href="#" disabled>«</PageLink></PageItem>
            <PageItem><PageLink href="#">1</PageLink></PageItem>
            <PageItem><PageLink href="#" active>2</PageLink></PageItem>
            <PageItem><PageLink href="#">3</PageLink></PageItem>
            <PageItem><PageLink href="#">»</PageLink></PageItem>
          </Pagination>
          <Progress><ProgressBar now={45} /></Progress>
          <div style={{ height: 8 }} />
          <Progress><ProgressBar now={70} variant="success" /></Progress>
        </Section>

        <Section title="Buttons">
          <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap', marginBottom: 8 }}>
            {COLORS.map((c) => <Button key={c} variant={c}>{c}</Button>)}
          </Stack>
          <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap', marginBottom: 8 }}>
            <Button variant="outline-primary">outline</Button>
            <Button variant="outline-danger">outline</Button>
            <Button size="sm">sm</Button>
            <Button size="lg">lg</Button>
            <Button disabled>disabled</Button>
            <Button as="a" href="#buttons">as link</Button>
          </Stack>
        </Section>

        <Section title="Badges">
          <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
            {COLORS.map((c) => <Badge key={c} variant={c}>{c}</Badge>)}
            <Badge variant="primary" pill>pill</Badge>
          </Stack>
        </Section>

        <Section title="Alerts">
          {(['primary', 'success', 'danger', 'warning'] as ColorName[]).map((c) => (
            <Alert key={c} variant={c}>This is a <strong>{c}</strong> alert.</Alert>
          ))}
        </Section>

        <Section title="Cards + Grid">
          <Row>
            {[1, 2, 3].map((n) => (
              <Col key={n} md={4}>
                <Card>
                  <CardBody>
                    <CardTitle>Card {n}</CardTitle>
                    <CardText>Token-themed surface, border, radius.</CardText>
                    <Button size="sm">Action</Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="Spinner">
          <Stack direction="horizontal" gap={3}>
            <Spinner />
            <Spinner size="sm" variant="danger" />
            <Spinner variant="success" />
          </Stack>
        </Section>

        <Section title="Forms">
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl type="email" placeholder="you@example.com" />
              </FormGroup>
              <FormGroup>
                <FormLabel>Plan</FormLabel>
                <FormSelect defaultValue="">
                  <option value="" disabled>Choose…</option>
                  <option>Free</option>
                  <option>Team</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>Bio</FormLabel>
                <FormControl as="textarea" rows={2} placeholder="About you" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormControl placeholder="invalid" isInvalid />
                <FormControl placeholder="valid" isValid style={{ marginTop: 8 }} />
              </FormGroup>
              <FormGroup>
                <FormCheck id="c1" label="Checkbox" defaultChecked />
                <FormCheck id="r1" type="radio" name="r" label="Radio" defaultChecked />
                <FormCheck id="s1" type="switch" label="Switch" defaultChecked />
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>@</InputGroupText>
                  <FormControl placeholder="username" />
                  <Button>Go</Button>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Section>
      </Container>
    </BootstrapStyledProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
