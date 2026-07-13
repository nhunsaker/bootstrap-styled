import type { Story } from '@ladle/react'
import { Ratio } from './Ratio'

export default { title: 'Layout/Ratio' }

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e9ecef',
      color: '#495057',
      font: '600 0.875rem system-ui, sans-serif',
    }}
  >
    {label}
  </div>
)

export const Named: Story = () => (
  <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(2, 240px)' }}>
    <Ratio ratio="1x1">
      <Placeholder label="1x1" />
    </Ratio>
    <Ratio ratio="4x3">
      <Placeholder label="4x3" />
    </Ratio>
    <Ratio ratio="16x9">
      <Placeholder label="16x9" />
    </Ratio>
    <Ratio ratio="21x9">
      <Placeholder label="21x9" />
    </Ratio>
  </div>
)

export const Embed: Story = () => (
  <div style={{ width: 480 }}>
    <Ratio ratio="16x9">
      <iframe
        title="placeholder embed"
        src="about:blank"
        style={{ border: 0, background: '#dee2e6' }}
      />
    </Ratio>
  </div>
)

export const CustomRatio: Story = () => (
  <div style={{ width: 480 }}>
    {/* 2x1 → padding-top 50% */}
    <Ratio ratio="50%">
      <Placeholder label="Custom 2x1 (50%)" />
    </Ratio>
  </div>
)
