import React from 'react'
import styled, { css } from 'styled-components'

// Bootstrap 5.3.8 class-based typography helpers (verified against
// parity/oracle/bootstrap.min.css). Reboot/GlobalStyles already sets the base
// element typography (raw h1-h6, p, etc.) — these components are the opt-in
// `.display-*`/`.lead`/`.h*`/`.blockquote`/list helper classes, the React way.

type DisplaySize = 1 | 2 | 3 | 4 | 5 | 6

// `.display-1..6`: fw 300, lh 1.2, RFS — a fluid `calc()` below 1200px that
// snaps to a fixed rem at the xl breakpoint (exactly Bootstrap's RFS output).
const DISPLAY: Record<DisplaySize, { fluid: string; fixed: string }> = {
  1: { fluid: 'calc(1.625rem + 4.5vw)', fixed: '5rem' },
  2: { fluid: 'calc(1.575rem + 3.9vw)', fixed: '4.5rem' },
  3: { fluid: 'calc(1.525rem + 3.3vw)', fixed: '4rem' },
  4: { fluid: 'calc(1.475rem + 2.7vw)', fixed: '3.5rem' },
  5: { fluid: 'calc(1.425rem + 2.1vw)', fixed: '3rem' },
  6: { fluid: 'calc(1.375rem + 1.5vw)', fixed: '2.5rem' },
}

// `.h1..6` sizing (the class form): only h1-h4 carry RFS; h5/h6 are fixed.
const HEADING: Record<DisplaySize, { fluid: string; fixed: string }> = {
  1: { fluid: 'calc(1.375rem + 1.5vw)', fixed: '2.5rem' },
  2: { fluid: 'calc(1.325rem + 0.9vw)', fixed: '2rem' },
  3: { fluid: 'calc(1.3rem + 0.6vw)', fixed: '1.75rem' },
  4: { fluid: 'calc(1.275rem + 0.3vw)', fixed: '1.5rem' },
  5: { fluid: '1.25rem', fixed: '1.25rem' },
  6: { fluid: '1rem', fixed: '1rem' },
}

const rfs = (fluid: string, fixed: string) =>
  fluid === fixed
    ? css`
        font-size: ${fixed};
      `
    : css`
        font-size: ${fluid};
        @media (min-width: 1200px) {
          font-size: ${fixed};
        }
      `

// --- Display ---------------------------------------------------------------

export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: DisplaySize
  as?: React.ElementType
}

const StyledDisplay = styled.h1<{ $size: DisplaySize }>`
  font-weight: 300;
  line-height: 1.2;
  ${(p) => rfs(DISPLAY[p.$size].fluid, DISPLAY[p.$size].fixed)}
`

export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ size = 1, as, ...rest }, ref) => (
    <StyledDisplay as={as ?? (`h${size}` as React.ElementType)} ref={ref} $size={size} {...rest} />
  ),
)
Display.displayName = 'Display'

// --- Lead ------------------------------------------------------------------

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType
}

export const Lead = styled.p<LeadProps>`
  font-size: 1.25rem;
  font-weight: 300;
`

// --- Heading (the `.h1..6` class helper on any element) --------------------

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Which `.h1..6` look to apply (defaults to matching the `as` tag, else 1). */
  size?: DisplaySize
  as?: React.ElementType
}

const StyledHeading = styled.h1<{ $size: DisplaySize }>`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--bs-heading-color, inherit);
  ${(p) => rfs(HEADING[p.$size].fluid, HEADING[p.$size].fixed)}
`

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ size, as, ...rest }, ref) => {
    // Infer the look from `as="h3"` when size isn't given; default to h1.
    const inferred =
      typeof as === 'string' && /^h[1-6]$/.test(as) ? (Number(as[1]) as DisplaySize) : 1
    const s = size ?? inferred
    return <StyledHeading as={as ?? (`h${s}` as React.ElementType)} ref={ref} $size={s} {...rest} />
  },
)
Heading.displayName = 'Heading'

// --- Inline text helpers ---------------------------------------------------

type Weight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
const WEIGHTS: Record<Weight, number> = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** `.small` — font-size: .875em. */
  small?: boolean
  /** Font weight utility (`.fw-*`). */
  weight?: Weight
  /** `.fst-italic`. */
  italic?: boolean
  /** `.text-body-secondary` — the muted body color. */
  muted?: boolean
  as?: React.ElementType
}

const StyledText = styled.span<{
  $small?: boolean
  $weight?: Weight
  $italic?: boolean
  $muted?: boolean
}>`
  ${(p) => p.$small && 'font-size: 0.875em;'}
  ${(p) => p.$weight && `font-weight: ${WEIGHTS[p.$weight]};`}
  ${(p) => p.$italic && 'font-style: italic;'}
  ${(p) => p.$muted && 'color: var(--bs-secondary-color, rgba(33, 37, 41, 0.75));'}
`

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ small, weight, italic, muted, as, ...rest }, ref) => (
    <StyledText
      as={as}
      ref={ref as React.Ref<HTMLSpanElement>}
      $small={small}
      $weight={weight}
      $italic={italic}
      $muted={muted}
      {...rest}
    />
  ),
)
Text.displayName = 'Text'

/** `.small` / `<small>` — font-size: .875em. */
export const Small = styled.small`
  font-size: 0.875em;
`

/** `<mark>` / `.mark` — Bootstrap highlight (padding + highlight tokens). */
export const Mark = styled.mark`
  padding: 0.1875em;
  color: var(--bs-highlight-color, #212529);
  background-color: var(--bs-highlight-bg, #fff3cd);
`

// --- Blockquote ------------------------------------------------------------

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  as?: React.ElementType
}

export const Blockquote = styled.blockquote<BlockquoteProps>`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  & > :last-child {
    margin-bottom: 0;
  }
`

/** `.blockquote-footer` — the "— Source" attribution line. */
export const BlockquoteFooter = styled.footer`
  margin-top: -1rem;
  margin-bottom: 1rem;
  font-size: 0.875em;
  color: #6c757d;
  &::before {
    content: '\\2014\\00A0'; /* em dash + nbsp */
  }
`

// --- Lists -----------------------------------------------------------------

export interface ListProps extends React.HTMLAttributes<HTMLElement> {
  /** `.list-unstyled` — drop bullets + left padding. */
  unstyled?: boolean
  /** `.list-inline` — lay items out inline (pair with `<ListInlineItem>`). */
  inline?: boolean
  as?: React.ElementType
}

const StyledList = styled.ul<{ $unstyled?: boolean; $inline?: boolean }>`
  ${(p) =>
    (p.$unstyled || p.$inline) &&
    css`
      padding-left: 0;
      list-style: none;
    `}
`

export const List = React.forwardRef<HTMLElement, ListProps>(
  ({ unstyled, inline, as, ...rest }, ref) => (
    <StyledList
      as={as}
      ref={ref as React.Ref<HTMLUListElement>}
      $unstyled={unstyled}
      $inline={inline}
      {...rest}
    />
  ),
)
List.displayName = 'List'

/** `.list-inline-item` — an inline list child. */
export const ListInlineItem = styled.li`
  display: inline-block;
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`
