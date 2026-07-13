import React from 'react'
import styled from 'styled-components'

export type ButtonGroupSize = 'sm' | 'lg'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Bootstrap `.btn-group-sm` / `.btn-group-lg` — resize every button in the group. */
  size?: ButtonGroupSize
  /** Bootstrap `.btn-group-vertical` — stack buttons and collapse vertical borders. */
  vertical?: boolean
  as?: React.ElementType
}

// Bootstrap 5.3.8 sets `--bs-btn-*` sizing vars on `.btn-group-sm>.btn` /
// `.btn-group-lg>.btn`. We emit those tokens verbatim (runtime-overridable) AND
// resize the child buttons directly — this repo's <Button> reads its own size
// prop for padding/font, so `&&` (doubled specificity) lets the group win.
const btnVars = (s?: ButtonGroupSize): string =>
  s === 'sm'
    ? `--bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.875rem; --bs-btn-border-radius: var(--bs-border-radius-sm);`
    : s === 'lg'
      ? `--bs-btn-padding-y: 0.5rem; --bs-btn-padding-x: 1rem; --bs-btn-font-size: 1.25rem; --bs-btn-border-radius: var(--bs-border-radius-lg);`
      : ''

const childPad = (s?: ButtonGroupSize): string =>
  s === 'sm'
    ? 'padding: 0.25rem 0.5rem; font-size: 0.875rem;'
    : s === 'lg'
      ? 'padding: 0.5rem 1rem; font-size: 1.25rem;'
      : ''

const childRadius = (s?: ButtonGroupSize): string =>
  s === 'sm'
    ? 'var(--bs-border-radius-sm)'
    : s === 'lg'
      ? 'var(--bs-border-radius-lg)'
      : 'var(--bs-border-radius)'

const StyledButtonGroup = styled.div<{ $size?: ButtonGroupSize; $vertical?: boolean }>`
  ${(p) => btnVars(p.$size)}
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  ${(p) =>
    p.$vertical
      ? 'flex-direction: column; align-items: flex-start; justify-content: center;'
      : 'border-radius: var(--bs-border-radius);'}

  & > * {
    position: relative;
    flex: 1 1 auto;
    ${(p) => (p.$vertical ? 'width: 100%;' : '')}
  }

  /* Interacted button borders sit above their neighbors. */
  & > *:hover,
  & > *:focus,
  & > *:active {
    z-index: 1;
  }

  /* Group sizing + shared corner radius on every child (&& out-specifies the
     single-class <Button> rule). */
  && > * {
    ${(p) => childPad(p.$size)}
    border-radius: ${(p) => childRadius(p.$size)};
  }

  ${(p) =>
    p.$vertical
      ? `
    && > *:not(:first-child) {
      margin-top: calc(-1 * var(--bs-border-width, 1px));
    }
    && > *:not(:last-child) {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    && > *:not(:first-child) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `
      : `
    && > *:not(:first-child) {
      margin-left: calc(-1 * var(--bs-border-width, 1px));
    }
    && > *:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    && > *:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}
`

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ size, vertical, role = 'group', ...rest }, ref) => (
    <StyledButtonGroup ref={ref} $size={size} $vertical={vertical} role={role} {...rest} />
  ),
)
ButtonGroup.displayName = 'ButtonGroup'

export interface ButtonToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const StyledButtonToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const ButtonToolbar = React.forwardRef<HTMLDivElement, ButtonToolbarProps>(
  ({ role = 'toolbar', ...rest }, ref) => (
    <StyledButtonToolbar ref={ref} role={role} {...rest} />
  ),
)
ButtonToolbar.displayName = 'ButtonToolbar'
