import type { Story } from '@ladle/react'
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Breadcrumb, BreadcrumbItem, Pagination, PageItem, PageLink, Tabs, Tab, Accordion, AccordionItem, Stack, Container } from '../../src'

export default { title: 'Navigation' }

export const NavBasic: Story = () => (
  <Nav>
    <NavItem><NavLink href="#" active>Home</NavLink></NavItem>
    <NavItem><NavLink href="#">Features</NavLink></NavItem>
    <NavItem><NavLink href="#">Pricing</NavLink></NavItem>
    <NavItem><NavLink href="#" disabled>Disabled</NavLink></NavItem>
  </Nav>
)
NavBasic.storyName = 'Nav'

export const NavbarExample: Story = () => (
  <Navbar style={{ borderRadius: 6 }}>
    <Container>
      <NavbarBrand href="#">MyApp</NavbarBrand>
      <Nav>
        <NavItem><NavLink href="#" active style={{ color: 'rgba(255,255,255,0.85)' }}>Home</NavLink></NavItem>
        <NavItem><NavLink href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>About</NavLink></NavItem>
        <NavItem><NavLink href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>Contact</NavLink></NavItem>
      </Nav>
    </Container>
  </Navbar>
)
NavbarExample.storyName = 'Navbar'

export const BreadcrumbExample: Story = () => (
  <Breadcrumb>
    <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
    <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
    <BreadcrumbItem active>Data</BreadcrumbItem>
  </Breadcrumb>
)
BreadcrumbExample.storyName = 'Breadcrumb'

export const PaginationExample: Story = () => (
  <Stack gap={2}>
    <Pagination>
      <PageItem><PageLink href="#" disabled>«</PageLink></PageItem>
      <PageItem><PageLink href="#">1</PageLink></PageItem>
      <PageItem><PageLink href="#" active>2</PageLink></PageItem>
      <PageItem><PageLink href="#">3</PageLink></PageItem>
      <PageItem><PageLink href="#">»</PageLink></PageItem>
    </Pagination>
  </Stack>
)
PaginationExample.storyName = 'Pagination'

export const TabsExample: Story = () => (
  <Tabs defaultActiveKey="first">
    <Tab eventKey="first" title="First">
      <p style={{ marginTop: 16 }}>First tab content.</p>
    </Tab>
    <Tab eventKey="second" title="Second">
      <p style={{ marginTop: 16 }}>Second tab content.</p>
    </Tab>
    <Tab eventKey="third" title="Disabled" disabled>Hidden</Tab>
  </Tabs>
)
TabsExample.storyName = 'Tabs'

export const AccordionExample: Story = () => (
  <Accordion defaultActiveKey="0">
    <AccordionItem eventKey="0" header="What is @metatoy/bootstrap-styled?">
      Bootstrap 5 components in styled-components, theme-driven via runtime CSS variables.
    </AccordionItem>
    <AccordionItem eventKey="1" header="Does it support dark mode?">
      Yes — pass <code>colorMode="dark"</code> to <code>BootstrapStyledProvider</code>.
    </AccordionItem>
    <AccordionItem eventKey="2" header="Is it TypeScript?">
      Fully typed. Props are inferred from interfaces; no hand-written prop tables needed.
    </AccordionItem>
  </Accordion>
)
AccordionExample.storyName = 'Accordion'
