import type { Story } from '@ladle/react'
import { ScrollspyNav } from './Scrollspy'

export default { title: 'Components/Scrollspy' }

const ITEMS = [
  { id: 'ss-first', label: 'First' },
  { id: 'ss-second', label: 'Second' },
  { id: 'ss-third', label: 'Third' },
]

const Section = ({ id, title }: { id: string; title: string }) => (
  <div id={id} style={{ minHeight: '60vh', paddingTop: '1rem' }}>
    <h4>{title}</h4>
    <p>
      Scroll this panel — the nav on the left highlights the section anchored near the top of the
      scroll region via IntersectionObserver.
    </p>
  </div>
)

// Live scrollspy inside a scrollable region.
export const Live: Story = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <div style={{ position: 'sticky', top: 0, alignSelf: 'flex-start' }}>
      <ScrollspyNav items={ITEMS} />
    </div>
    <div style={{ height: '300px', overflowY: 'auto', flex: 1, border: '1px solid var(--bs-border-color)', padding: '0 1rem' }}>
      <Section id="ss-first" title="First section" />
      <Section id="ss-second" title="Second section" />
      <Section id="ss-third" title="Third section" />
    </div>
  </div>
)

// Static: the second item forced active for a harness parity shot (nav-pills look).
export const ActiveStatic: Story = () => (
  <ScrollspyNav items={ITEMS} activeId="ss-second" />
)

// Static list-group variant with an active item.
export const ListGroupStatic: Story = () => (
  <ScrollspyNav items={ITEMS} activeId="ss-third" variant="list-group" />
)
