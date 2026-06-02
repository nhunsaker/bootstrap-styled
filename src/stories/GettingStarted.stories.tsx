import { useState } from 'react'
import type { Story } from '@ladle/react'
import {
  BootstrapStyledProvider,
  createTheme,
  Button,
  Badge,
  Alert,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Stack,
} from '../../src'

// ── Introduction ─────────────────────────────────────────────────────────────

export const Introduction: Story = () => (
  <Stack gap={3}>
    <div>
      <h1 style={{ marginBottom: 8 }}>@metatoy/bootstrap-styled</h1>
      <p style={{ color: 'var(--bs-secondary)', maxWidth: 600 }}>
        Bootstrap 5 components implemented in <strong>styled-components 6</strong>,
        theme-driven via runtime <code>--bs-*</code> CSS variables. A modern
        rewrite of the abandoned{' '}
        <a href="https://github.com/bootstrap-styled/v4" target="_blank" rel="noreferrer">
          bootstrap-styled/v4
        </a>{' '}
        targeting React 18 and TypeScript.
      </p>
    </div>

    <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
      <Badge variant="primary">Bootstrap 5.3</Badge>
      <Badge variant="secondary">styled-components 6</Badge>
      <Badge variant="dark">React 18</Badge>
      <Badge variant="info">TypeScript</Badge>
    </Stack>
  </Stack>
)
Introduction.storyName = 'Introduction'

// ── Installation ─────────────────────────────────────────────────────────────

export const Installation: Story = () => (
  <Stack gap={3}>
    <div>
      <h2>Installation</h2>
      <pre style={{ background: 'var(--bs-light)', padding: '1rem', borderRadius: 6, overflow: 'auto' }}>
        {`npm install @metatoy/bootstrap-styled styled-components react react-dom`}
      </pre>
    </div>

    <div>
      <h3>Peer dependencies</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--bs-border-color)' }}>
            {['Package', 'Version'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--bs-secondary)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[['react', '≥ 18'], ['react-dom', '≥ 18'], ['styled-components', '≥ 6'], ['@floating-ui/react', '≥ 0.26 (auto-installed)']].map(([pkg, ver]) => (
            <tr key={pkg} style={{ borderBottom: '1px solid var(--bs-border-color)' }}>
              <td style={{ padding: '8px 12px' }}><code>{pkg}</code></td>
              <td style={{ padding: '8px 12px' }}>{ver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Stack>
)
Installation.storyName = 'Installation'

// ── Quick Start ───────────────────────────────────────────────────────────────

export const QuickStart: Story = () => (
  <Stack gap={4}>
    <div>
      <h2>Quick Start</h2>
      <p>Wrap your app in <code>BootstrapStyledProvider</code> — it injects the theme as <code>--bs-*</code> CSS variables and provides the styled-components theme context.</p>
      <pre style={{ background: 'var(--bs-light)', padding: '1rem', borderRadius: 6, fontSize: 13, overflow: 'auto' }}>
{`import { BootstrapStyledProvider, Button } from '@metatoy/bootstrap-styled'

export default function App() {
  return (
    <BootstrapStyledProvider>
      <Button variant="primary">Hello!</Button>
    </BootstrapStyledProvider>
  )
}`}
      </pre>
    </div>

    <div>
      <h3>Live result</h3>
      <Stack direction="horizontal" gap={2}>
        <Button variant="primary">Hello!</Button>
        <Button variant="success">It works</Button>
      </Stack>
    </div>
  </Stack>
)
QuickStart.storyName = 'Quick Start'

// ── Theming ───────────────────────────────────────────────────────────────────

export const Theming: Story = () => {
  const [primary, setPrimary] = useState('#0d6efd')
  const theme = createTheme({ colors: { primary } })

  return (
    <Stack gap={4}>
      <div>
        <h2>Theming</h2>
        <p>
          <code>createTheme()</code> deep-merges overrides onto Bootstrap 5 defaults.
          The provider projects the theme onto <code>--bs-*</code> CSS variables at runtime —
          changing the theme re-skins every component instantly, no re-bundling needed.
        </p>
        <pre style={{ background: 'var(--bs-light)', padding: '1rem', borderRadius: 6, fontSize: 13, overflow: 'auto' }}>
{`import { createTheme, BootstrapStyledProvider } from '@metatoy/bootstrap-styled'

const theme = createTheme({ colors: { primary: '#7c3aed' } })

<BootstrapStyledProvider theme={theme}>
  {/* Every component re-skins to the custom primary */}
</BootstrapStyledProvider>`}
        </pre>
      </div>

      <div>
        <h3>Live demo — change primary color</h3>
        <Stack direction="horizontal" gap={3} style={{ marginBottom: 16, alignItems: 'center' }}>
          <label style={{ fontWeight: 600 }}>Primary</label>
          <input type="color" value={primary} onChange={e => setPrimary(e.target.value)}
            style={{ width: 44, height: 28, padding: 2, border: '1px solid var(--bs-border-color)', borderRadius: 4, cursor: 'pointer', background: 'var(--bs-body-bg)' }} />
          <code style={{ fontSize: 13 }}>{primary}</code>
        </Stack>
        <BootstrapStyledProvider theme={theme}>
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2} style={{ flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="outline-primary">Outline</Button>
              <Badge variant="primary">Badge</Badge>
              <Alert variant="primary" style={{ margin: 0 }}>Alert</Alert>
            </Stack>
            <Card>
              <CardBody>
                <CardTitle>Card with custom theme</CardTitle>
                <CardText>Changing the primary color above re-skins all of these instantly.</CardText>
                <Button variant="primary" size="sm">Action</Button>
              </CardBody>
            </Card>
          </Stack>
        </BootstrapStyledProvider>
      </div>
    </Stack>
  )
}
Theming.storyName = 'Theming'
