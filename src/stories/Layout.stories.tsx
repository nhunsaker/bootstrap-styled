import type { Story } from '@ladle/react'
import { Container, Row, Col, Stack } from '../../src'

export default { title: 'Layout' }

// shared cell style
const cell = { background: 'color-mix(in srgb, var(--bs-primary) 15%, var(--bs-body-bg))', border: '1px solid var(--bs-primary)', borderRadius: 4, padding: '8px 12px', fontSize: 13, color: 'var(--bs-body-color)' }

export const GridColumns: Story = () => (
  <Container>
    <Row style={{ marginBottom: 8 }}>
      {[1,2,3].map(n => <Col key={n}><div style={cell}>Col (equal)</div></Col>)}
    </Row>
    <Row style={{ marginBottom: 8 }}>
      <Col span={4}><div style={cell}>Col span=4</div></Col>
      <Col span={8}><div style={cell}>Col span=8</div></Col>
    </Row>
    <Row>
      <Col md={6} lg={4}><div style={cell}>md=6 lg=4</div></Col>
      <Col md={6} lg={4}><div style={cell}>md=6 lg=4</div></Col>
      <Col md={12} lg={4}><div style={cell}>md=12 lg=4</div></Col>
    </Row>
  </Container>
)
GridColumns.storyName = 'Grid / Col'

export const StackVertical: Story = () => (
  <Stack gap={2} style={{ maxWidth: 300 }}>
    {['First', 'Second', 'Third'].map(n => <div key={n} style={cell}>{n}</div>)}
  </Stack>
)
StackVertical.storyName = 'Stack (vertical)'

export const StackHorizontal: Story = () => (
  <Stack direction="horizontal" gap={3} style={{ flexWrap: 'wrap' }}>
    {['Alpha', 'Beta', 'Gamma', 'Delta'].map(n => <div key={n} style={cell}>{n}</div>)}
  </Stack>
)
StackHorizontal.storyName = 'Stack (horizontal)'
