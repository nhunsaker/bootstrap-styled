import type { Story } from '@ladle/react'
import { useState } from 'react'
import { Collapse } from './Collapse'

export default { title: 'Components/Collapse' }

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '1.25rem',
      marginTop: '0.5rem',
      border: '1px solid var(--bs-border-color)',
      borderRadius: 'var(--bs-border-radius)',
    }}
  >
    {children}
  </div>
)

const btn = {
  padding: '0.375rem 0.75rem',
  color: '#fff',
  background: 'var(--bs-primary, #0d6efd)',
  border: 0,
  borderRadius: 'var(--bs-border-radius)',
  cursor: 'pointer',
}

// Interactive vertical collapse.
export const Vertical: Story = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button style={btn} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        Toggle
      </button>
      <Collapse show={open}>
        <Box>
          Some placeholder content for the collapse component. This panel animates its height
          over 0.35s ease, matching Bootstrap 5.3.8.
        </Box>
      </Collapse>
    </div>
  )
}

// Horizontal collapse (`.collapse-horizontal`).
export const Horizontal: Story = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button style={btn} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        Toggle width
      </button>
      <div style={{ minHeight: '120px' }}>
        <Collapse show={open} horizontal>
          <div style={{ width: '300px' }}>
            <Box>This is some placeholder content for a horizontal collapse.</Box>
          </div>
        </Collapse>
      </div>
    </div>
  )
}

// Static shown state — renders open with no transition (harness parity shot).
export const ShownStatic: Story = () => (
  <Collapse show>
    <Box>Rendered statically expanded (show defaulted true on mount).</Box>
  </Collapse>
)
