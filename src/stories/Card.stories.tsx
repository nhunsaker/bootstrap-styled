import type { Story } from '@ladle/react'
import { Card, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle, CardText, Button, Row, Col } from '../../src'

export default { title: 'Core/Card' }

export const Basic: Story = () => (
  <Card style={{ maxWidth: 360 }}>
    <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>Some quick example text to build on the card title.</CardText>
      <Button variant="primary">Go somewhere</Button>
    </CardBody>
  </Card>
)

export const WithHeaderFooter: Story = () => (
  <Card style={{ maxWidth: 360 }}>
    <CardHeader>Featured</CardHeader>
    <CardBody>
      <CardTitle>Special title treatment</CardTitle>
      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
      <Button variant="primary">Go somewhere</Button>
    </CardBody>
    <CardFooter style={{ color: 'var(--bs-secondary)', fontSize: '0.875rem' }}>2 days ago</CardFooter>
  </Card>
)

export const Grid: Story = () => (
  <Row>
    {['One', 'Two', 'Three'].map(n => (
      <Col key={n} md={4}>
        <Card>
          <CardBody>
            <CardTitle>Card {n}</CardTitle>
            <CardText>Token-themed surface, border and radius.</CardText>
            <Button variant="primary" size="sm">Action</Button>
          </CardBody>
        </Card>
      </Col>
    ))}
  </Row>
)
