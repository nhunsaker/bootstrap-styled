import type { Story } from '@ladle/react'
// Imported from the component dir directly (the lead wires the src/index.ts export).
import { Icon, BsIconAlarm, BsIconStar, BsIconGear, BsIconTrash } from '../components/Icon'

export default { title: 'Core/Icon' }

/** Dynamic convenience form at its 1em default. */
export const Default: Story = () => <Icon name="alarm" />

/** `size` — number → px, string passes through. */
export const Sized: Story = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon name="star" />
    <Icon name="star" size={24} />
    <Icon name="star" size={32} />
    <Icon name="star" size="3rem" />
  </div>
)

/** Color rides `currentColor` — set `color` on any parent (or a `--bs-*` token). */
export const Colored: Story = () => (
  <div style={{ display: 'flex', gap: 16, fontSize: 32 }}>
    <span style={{ color: 'var(--bs-primary, #0d6efd)' }}>
      <Icon name="house" />
    </span>
    <span style={{ color: 'var(--bs-danger, #dc3545)' }}>
      <Icon name="trash" />
    </span>
    <span style={{ color: 'var(--bs-success, #198754)' }}>
      <Icon name="check" />
    </span>
  </div>
)

/** Labelled → `role="img"` + `aria-label` (decorative `aria-hidden` otherwise). */
export const Labeled: Story = () => (
  <div style={{ display: 'flex', gap: 16, fontSize: 24 }}>
    <Icon name="gear" label="Settings" />
    <Icon name="search" label="Search" />
    <Icon name="alarm" title="Set an alarm" />
  </div>
)

/** Tree-shakeable per-icon exports — `<BsIconAlarm/>` et al. */
export const PerIconExports: Story = () => (
  <div style={{ display: 'flex', gap: 16, fontSize: 28 }}>
    <BsIconAlarm />
    <BsIconStar />
    <BsIconGear />
    <BsIconTrash />
  </div>
)

/** Dynamic `<Icon name>` across the committed subset. */
export const DynamicNames: Story = () => {
  const names = [
    'alarm', 'check', 'x', 'chevron-down', 'chevron-up', 'chevron-left',
    'chevron-right', 'house', 'gear', 'search', 'trash', 'plus', 'star',
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 28 }}>
      {names.map((n) => (
        <Icon key={n} name={n} label={n} />
      ))}
    </div>
  )
}
