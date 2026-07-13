import type { Story } from '@ladle/react'
import {
  Display,
  Lead,
  Heading,
  Text,
  Small,
  Mark,
  Blockquote,
  BlockquoteFooter,
  List,
  ListInlineItem,
} from './Typography'

export default { title: 'Content/Typography' }

const SIZES = [1, 2, 3, 4, 5, 6] as const

export const Displays: Story = () => (
  <div>
    {SIZES.map((s) => (
      <Display key={s} size={s}>
        Display {s}
      </Display>
    ))}
  </div>
)

export const Headings: Story = () => (
  <div>
    {SIZES.map((s) => (
      <Heading key={s} size={s}>
        Heading .h{s}
      </Heading>
    ))}
    <p>
      <Heading as="span" size={3}>
        .h3 look on a span
      </Heading>
    </p>
  </div>
)

export const LeadText: Story = () => (
  <div>
    <Lead>This is a lead paragraph. It stands out from regular paragraphs.</Lead>
    <p>Regular paragraph for comparison.</p>
  </div>
)

export const InlineText: Story = () => (
  <p>
    You can use the <Mark>mark tag to highlight</Mark> text.{' '}
    <Text small muted>
      This line of text is meant to be treated as fine print.
    </Text>{' '}
    <Text weight="bold">Bold.</Text> <Text weight="light">Light.</Text>{' '}
    <Text italic>Italic.</Text> <Small>This is small text.</Small>
  </p>
)

export const Quote: Story = () => (
  <figure>
    <Blockquote>
      <p>A well-known quote, contained in a blockquote element.</p>
    </Blockquote>
    <BlockquoteFooter>
      Someone famous in <cite title="Source Title">Source Title</cite>
    </BlockquoteFooter>
  </figure>
)

export const Lists: Story = () => (
  <div>
    <List unstyled>
      <li>Unstyled item one</li>
      <li>Unstyled item two</li>
      <li>Unstyled item three</li>
    </List>
    <List inline>
      <ListInlineItem>Inline one</ListInlineItem>
      <ListInlineItem>Inline two</ListInlineItem>
      <ListInlineItem>Inline three</ListInlineItem>
    </List>
  </div>
)
