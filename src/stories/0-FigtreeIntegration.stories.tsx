import { useState } from 'react'
import type { Story } from '@ladle/react'
import {
  BootstrapStyledProvider, createTheme, Button, Badge, Alert,
  Card, CardBody, CardTitle, CardText, Stack,
} from '../../src'

export default { title: 'Getting Started/Figtree Integration' }

/**
 * Shows how @metatoy/bootstrap-styled and @metatoy/figtree-react work together.
 * FigtreeProvider sets CSS custom properties on <html> as a live preview;
 * BootstrapStyledProvider projects those same vars into the BS theme.
 * The Figma plugin → bridge → app loop re-skins everything without re-bundling.
 */
export const LivePreviewSimulation: Story = () => {
  const presets = [
    { label: 'Default blue', primary: '#0d6efd', success: '#198754', danger: '#dc3545' },
    { label: 'Purple brand',  primary: '#7c3aed', success: '#059669', danger: '#dc2626' },
    { label: 'Teal',          primary: '#0891b2', success: '#16a34a', danger: '#e11d48' },
    { label: 'Figtree demo',  primary: '#0F65EF', success: '#68AF15', danger: '#EE3322' },
  ]
  const [preset, setPreset] = useState(0)
  const theme = createTheme({ colors: { primary: presets[preset].primary, success: presets[preset].success, danger: presets[preset].danger } })

  return (
    <Stack gap={4}>
      <div>
        <h3 style={{ marginBottom: 8 }}>Figtree + bootstrap-styled</h3>
        <p style={{ color: 'var(--bs-secondary)', marginBottom: 16, maxWidth: 560 }}>
          The Figma plugin sends token overrides → the bridge sets{' '}
          <code>--bs-primary</code> etc. on <code>&lt;html&gt;</code> →{' '}
          <code>BootstrapStyledProvider</code> picks them up instantly. No rebuild needed.
          Below simulates that live-token-override loop.
        </p>
        <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
          {presets.map((p, i) => (
            <Button
              key={p.label}
              size="sm"
              variant={i === preset ? 'primary' : 'outline-secondary'}
              onClick={() => setPreset(i)}
            >{p.label}</Button>
          ))}
        </Stack>
      </div>

      <BootstrapStyledProvider theme={theme}>
        <Stack gap={3}>
          <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline-primary">Outline</Button>
            <Badge variant="primary">Badge</Badge>
            <Badge variant="success">Success</Badge>
          </Stack>
          <Alert variant="primary">This alert uses the live primary color.</Alert>
          <Card>
            <CardBody>
              <CardTitle>Live-themed card</CardTitle>
              <CardText>
                Every component re-skins when the Figma plugin sends new token values —
                the same mechanism that drives the preview banner in your app.
              </CardText>
              <Button variant="primary" size="sm">Action</Button>
            </CardBody>
          </Card>
        </Stack>
      </BootstrapStyledProvider>
    </Stack>
  )
}
LivePreviewSimulation.storyName = 'Live preview simulation'
