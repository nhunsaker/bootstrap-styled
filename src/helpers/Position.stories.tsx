import type { Story } from '@ladle/react'
import { StickyTop, TranslateMiddle } from './Position'

export default { title: 'Helpers/Position' }

// Fixed-top/bottom escape the story frame, so demo the in-flow-friendly ones.
export const Sticky: Story = () => (
  <div style={{ height: 200, overflow: 'auto', border: '1px solid #dee2e6' }}>
    <StickyTop style={{ background: '#0d6efd', color: '#fff', padding: '0.5rem' }}>
      .sticky-top header
    </StickyTop>
    <div style={{ padding: '0.5rem' }}>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>Scroll content line {i + 1}</p>
      ))}
    </div>
  </div>
)

export const AbsoluteCentering: Story = () => (
  <div
    style={{
      position: 'relative',
      width: 200,
      height: 120,
      background: '#e9ecef',
      borderRadius: '0.375rem',
    }}
  >
    <TranslateMiddle
      absolute
      top={0}
      start={100}
      style={{
        background: '#dc3545',
        color: '#fff',
        borderRadius: '999px',
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
      }}
    >
      99+
    </TranslateMiddle>
    <TranslateMiddle
      absolute
      top={50}
      start={50}
      style={{ background: '#0d6efd', color: '#fff', borderRadius: '0.375rem', padding: '0.5rem' }}
    >
      centered
    </TranslateMiddle>
  </div>
)
