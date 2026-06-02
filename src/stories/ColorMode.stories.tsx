import { useState } from 'react'
import type { Story } from '@ladle/react'
import {
  BootstrapStyledProvider, Button, Badge, Alert, Card, CardBody, CardTitle, CardText,
  FormControl, FormGroup, FormLabel, Stack,
} from '../../src'

export default { title: 'Getting Started/Color Modes' }

// Side-by-side light + dark so the contrast is immediately visible
export const LightAndDark: Story = () => (
  <Row>
    {(['light', 'dark'] as const).map(mode => (
      <div key={mode} style={{ flex: 1, padding: 4 }}>
        <BootstrapStyledProvider colorMode={mode}>
          <div style={{
            background: mode === 'dark' ? '#212529' : '#ffffff',
            padding: '1.5rem',
            borderRadius: 8,
            border: '1px solid var(--bs-border-color)',
          }}>
            <h4 style={{ color: 'var(--bs-body-color)', marginBottom: 16 }}>
              {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </h4>
            <Stack gap={2}>
              <Stack direction="horizontal" gap={2}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Badge variant="success">Badge</Badge>
              </Stack>
              <Alert variant="primary">A primary alert</Alert>
              <Card><CardBody>
                <CardTitle>Card</CardTitle>
                <CardText>Body text in {mode} mode.</CardText>
              </CardBody></Card>
              <FormGroup>
                <FormLabel>Input</FormLabel>
                <FormControl placeholder="Type something..." />
              </FormGroup>
            </Stack>
          </div>
        </BootstrapStyledProvider>
      </div>
    ))}
  </Row>
)
LightAndDark.storyName = 'Light & Dark side-by-side'

export const Toggle: Story = () => {
  const [mode, setMode] = useState<'light'|'dark'>('light')
  return (
    <Stack gap={3}>
      <Stack direction="horizontal" gap={2}>
        <Button
          variant={mode === 'light' ? 'primary' : 'outline-secondary'}
          size="sm"
          onClick={() => setMode('light')}
        >☀️ Light</Button>
        <Button
          variant={mode === 'dark' ? 'primary' : 'outline-secondary'}
          size="sm"
          onClick={() => setMode('dark')}
        >🌙 Dark</Button>
      </Stack>
      <BootstrapStyledProvider colorMode={mode}>
        <div style={{
          background: mode === 'dark' ? '#212529' : '#ffffff',
          padding: '1.5rem',
          borderRadius: 8,
          border: '1px solid var(--bs-border-color)',
          transition: 'background 0.2s',
        }}>
          <Stack gap={2}>
            <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
              {(['primary','secondary','success','danger','warning'] as const).map(v => (
                <Button key={v} variant={v}>{v}</Button>
              ))}
            </Stack>
            <Alert variant="success">This alert adapts to the color mode.</Alert>
            <FormControl placeholder="Input adapts too..." />
          </Stack>
        </div>
      </BootstrapStyledProvider>
    </Stack>
  )
}
Toggle.storyName = 'Toggle'

// Row helper (not worth importing full Grid for this story)
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{children}</div>
}
