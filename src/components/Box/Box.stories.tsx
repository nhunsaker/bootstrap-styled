import type { Story } from '@ladle/react'
import { Box } from './Box'

export default { title: 'Utilities/Box' }

/*
 * NOTE ON CSS: <Box> emits real Bootstrap utility classNames (m-3, d-flex, bg-primary …).
 * It only renders as intended when Bootstrap's utility CSS is present on the page.
 *  - In-app that CSS ships via GlobalStyles / the consumer's stylesheet (a theme-owner
 *    decision — Box does not inject it).
 *  - In the parity harness the lead maps Box cells against a native `<div class="…">`
 *    so both sides get the same vendored oracle CSS.
 * If these stories look unstyled in Ladle, that's expected: Ladle doesn't load Bootstrap.
 */

export const Spacing: Story = () => (
  <Box p={4} bg="body-tertiary">
    <Box mb={3} p={3} bg="primary-subtle">
      m/p spacing scale — this cell is <code>p-3 mb-3 bg-primary-subtle</code>
    </Box>
    <Box mx="auto" w={50} p={2} bg="success-subtle">
      <code>mx-auto w-50 p-2</code>
    </Box>
  </Box>
)

export const DisplayAndFlex: Story = () => (
  <Box d="flex" justify="between" align="center" gap={3} p={3} border rounded>
    <Box p={2} bg="primary" text="white">
      A
    </Box>
    <Box p={2} bg="secondary" text="white">
      B
    </Box>
    <Box p={2} bg="danger" text="white">
      C
    </Box>
  </Box>
)

export const BackgroundAndText: Story = () => (
  <Box d="flex" flex="column" gap={2}>
    <Box p={2} bg="primary" text="white">
      bg-primary / text-white
    </Box>
    <Box p={2} bg="warning-subtle" text="warning-emphasis">
      bg-warning-subtle / text-warning-emphasis
    </Box>
    <Box p={2} bg="dark" text="light">
      bg-dark / text-light
    </Box>
    <Box p={2} text="center" bg="body-secondary">
      text-center
    </Box>
  </Box>
)

export const BorderRoundedShadow: Story = () => (
  <Box d="flex" gap={4} p={4}>
    <Box p={3} border borderColor="primary" borderWidth={2} rounded={3}>
      border-primary border-2 rounded-3
    </Box>
    <Box p={3} bg="body-tertiary" rounded="pill" shadow="sm">
      rounded-pill shadow-sm
    </Box>
    <Box p={3} bg="white" shadow="lg" rounded>
      shadow-lg rounded
    </Box>
    <Box p={3} border="top" borderColor="danger">
      border-top border-danger
    </Box>
  </Box>
)

export const ResponsiveObjectValue: Story = () => (
  <Box
    p={{ base: 2, md: 4 }}
    d={{ base: 'block', md: 'flex' }}
    gap={{ base: 1, md: 3 }}
    bg="info-subtle"
  >
    <Box p={2} bg="white">
      Resize the viewport: this container is <code>p-2 p-md-4 d-block d-md-flex gap-1 gap-md-3</code>
    </Box>
    <Box p={2} bg="white">
      Cells stack on small screens, row on md+.
    </Box>
  </Box>
)

export const AsPolymorphism: Story = () => (
  <Box d="flex" flex="column" gap={2}>
    <Box as="section" p={2} bg="primary-subtle">
      as="section"
    </Box>
    <Box as="nav" p={2} bg="success-subtle">
      as="nav"
    </Box>
    <Box as="header" p={2} bg="body-tertiary" rounded text="primary">
      as="header"
    </Box>
    <Box as="article" p={2} border rounded>
      as="article"
    </Box>
    {/* Element-specific attrs (href/type) forward at runtime; the simple polymorphic
        type mirrors the repo's <Stack> pattern — cast or use className if TS complains. */}
  </Box>
)

export const ClassNamePassthrough: Story = () => (
  <Box d="flex" flex="column" gap={2}>
    <Box m={3} className="mt-3" p={2} bg="warning-subtle">
      <code>m={'{3}'} className="mt-3"</code> → classes are <code>m-3 mt-3 …</code> (user className
      wins the cascade order)
    </Box>
    <Box className="p-4 border border-info rounded">
      Pure className escape hatch (no utility props) still works.
    </Box>
  </Box>
)
