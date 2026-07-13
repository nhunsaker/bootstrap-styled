import type { ReactNode } from 'react'
import type { Story } from '@ladle/react'
import { Placeholder, PlaceholderGlow, PlaceholderWave } from './Placeholder'

export default { title: 'Components/Placeholder' }

const Card = ({ children }: { children: ReactNode }) => (
  <div style={{ maxWidth: 320, border: '1px solid #dee2e6', borderRadius: '0.375rem', overflow: 'hidden' }}>
    <div style={{ height: 180, background: '#e9ecef' }} />
    <div style={{ padding: '1rem' }}>{children}</div>
  </div>
)

export const Sizes: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
    <Placeholder size="xs" col={12} />
    <Placeholder size="sm" col={12} />
    <Placeholder col={12} />
    <Placeholder size="lg" col={12} />
  </div>
)

export const Widths: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
    <Placeholder col={6} />
    <Placeholder col={4} />
    <Placeholder col={4} />
    <Placeholder col={8} />
  </div>
)

export const Glow: Story = () => (
  <Card>
    <PlaceholderGlow>
      <Placeholder col={7} /> <Placeholder col={4} /> <Placeholder col={4} />{' '}
      <Placeholder col={6} /> <Placeholder col={8} />
    </PlaceholderGlow>
  </Card>
)

export const Wave: Story = () => (
  <Card>
    <PlaceholderWave>
      <Placeholder col={12} /> <Placeholder col={6} /> <Placeholder col={5} />{' '}
      <Placeholder col={8} />
    </PlaceholderWave>
  </Card>
)
