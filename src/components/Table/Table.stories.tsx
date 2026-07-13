import type { Story } from '@ladle/react'
import { Table } from './Table'

export default { title: 'Content/Table' }

const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const

const Body = () => (
  <>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </>
)

export const Basic: Story = () => (
  <Table>
    <Body />
  </Table>
)

export const Striped: Story = () => (
  <Table striped>
    <Body />
  </Table>
)

export const StripedColumns: Story = () => (
  <Table stripedColumns>
    <Body />
  </Table>
)

export const Hover: Story = () => (
  <Table hover>
    <Body />
  </Table>
)

export const Bordered: Story = () => (
  <Table bordered>
    <Body />
  </Table>
)

export const Borderless: Story = () => (
  <Table borderless>
    <Body />
  </Table>
)

export const Small: Story = () => (
  <Table size="sm">
    <Body />
  </Table>
)

export const Contextual: Story = () => (
  <Table>
    <tbody>
      <tr>
        <td>Default</td>
      </tr>
      {COLORS.map((c) => (
        <tr key={c} className={`table-${c}`}>
          <td>Table {c}</td>
        </tr>
      ))}
      <tr className="table-active">
        <td>Active</td>
      </tr>
    </tbody>
  </Table>
)

export const VariantTable: Story = () => (
  <Table variant="dark" striped hover>
    <Body />
  </Table>
)

export const GroupDivider: Story = () => (
  <Table>
    <thead>
      <tr>
        <th scope="col">Col</th>
      </tr>
    </thead>
    <tbody className="table-group-divider">
      <tr>
        <td>Divided body</td>
      </tr>
    </tbody>
  </Table>
)

export const WithCaption: Story = () => (
  <Table>
    <caption>List of users</caption>
    <Body />
  </Table>
)

export const Responsive: Story = () => (
  <Table responsive>
    <Body />
  </Table>
)
