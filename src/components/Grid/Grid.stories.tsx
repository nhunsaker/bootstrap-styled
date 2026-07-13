import type { ReactNode } from 'react'
import type { Story } from '@ladle/react'
import { Container, Row, Col } from './Grid'

export default { title: 'Layout/Grid' }

const Cell = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      background: 'rgba(13,110,253,0.1)',
      border: '1px solid rgba(13,110,253,0.2)',
      padding: '0.75rem',
      textAlign: 'center',
      font: '0.875rem system-ui, sans-serif',
    }}
  >
    {children}
  </div>
)

export const EqualWidth: Story = () => (
  <Container>
    <Row>
      <Col>
        <Cell>col</Cell>
      </Col>
      <Col>
        <Cell>col</Cell>
      </Col>
      <Col>
        <Cell>col</Cell>
      </Col>
    </Row>
  </Container>
)

export const Spans: Story = () => (
  <Container>
    <Row>
      <Col span={4}>
        <Cell>span=4</Cell>
      </Col>
      <Col span={8}>
        <Cell>span=8</Cell>
      </Col>
    </Row>
    <Row>
      <Col span="auto">
        <Cell>auto</Cell>
      </Col>
      <Col>
        <Cell>fill</Cell>
      </Col>
    </Row>
  </Container>
)

export const Responsive: Story = () => (
  <Container>
    <Row>
      <Col span={12} md={6} xl={4}>
        <Cell>12 · md=6 · xl=4</Cell>
      </Col>
      <Col span={12} md={6} xl={4}>
        <Cell>12 · md=6 · xl=4</Cell>
      </Col>
      <Col span={12} md={12} xl={4}>
        <Cell>12 · md=12 · xl=4</Cell>
      </Col>
    </Row>
  </Container>
)

export const Offset: Story = () => (
  <Container>
    <Row>
      <Col span={4}>
        <Cell>span=4</Cell>
      </Col>
      <Col span={4} offset={4}>
        <Cell>span=4 offset=4</Cell>
      </Col>
    </Row>
    <Row>
      <Col span={6} offset={3}>
        <Cell>span=6 offset=3</Cell>
      </Col>
    </Row>
  </Container>
)

export const Order: Story = () => (
  <Container>
    <Row>
      <Col order="last">
        <Cell>first in DOM, last visually</Cell>
      </Col>
      <Col>
        <Cell>unordered</Cell>
      </Col>
      <Col order="first">
        <Cell>last in DOM, first visually</Cell>
      </Col>
    </Row>
  </Container>
)

export const RowCols: Story = () => (
  <Container>
    <Row cols={2} colsMd={3}>
      {Array.from({ length: 6 }, (_, i) => (
        <Col key={i}>
          <Cell>{`item ${i + 1}`}</Cell>
        </Col>
      ))}
    </Row>
  </Container>
)

export const Gutters: Story = () => (
  <Container>
    <Row g={5}>
      <Col span={6}>
        <Cell>g=5</Cell>
      </Col>
      <Col span={6}>
        <Cell>g=5</Cell>
      </Col>
      <Col span={6}>
        <Cell>g=5</Cell>
      </Col>
      <Col span={6}>
        <Cell>g=5</Cell>
      </Col>
    </Row>
    <Row gx={0} gy={3} style={{ marginTop: '1.5rem' }}>
      <Col span={6}>
        <Cell>gx=0 gy=3</Cell>
      </Col>
      <Col span={6}>
        <Cell>gx=0 gy=3</Cell>
      </Col>
      <Col span={6}>
        <Cell>gx=0 gy=3</Cell>
      </Col>
      <Col span={6}>
        <Cell>gx=0 gy=3</Cell>
      </Col>
    </Row>
  </Container>
)

export const Containers: Story = () => (
  <>
    <Container>
      <Cell>.container</Cell>
    </Container>
    <Container breakpoint="md" style={{ marginTop: '0.5rem' }}>
      <Cell>.container-md</Cell>
    </Container>
    <Container fluid style={{ marginTop: '0.5rem' }}>
      <Cell>.container-fluid</Cell>
    </Container>
  </>
)
