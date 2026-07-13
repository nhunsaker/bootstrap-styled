import React from 'react'
import styled from 'styled-components'

export type InputGroupSize = 'sm' | 'lg'

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `sm` / `lg` — sizes every control + addon in the group (Bootstrap's
   * `.input-group-sm` / `.input-group-lg`). */
  size?: InputGroupSize
}

// Per-size declarations applied to every group member (btn / control / select /
// textarea / addon), exact from the 5.3.8 oracle:
//   .input-group-sm>* { padding:.25rem .5rem; font-size:.875rem; radius-sm }
//   .input-group-lg>* { padding:.5rem 1rem;  font-size:1.25rem; radius-lg }
//   .input-group-{sm,lg}>.form-select { padding-right:3rem }
// Element-qualified selectors ( `& > input` etc.) carry specificity (0,1,1),
// which outranks a control's own single-class rule (0,1,0), so the group size
// wins without touching engineer A's control components.
const sizeCss = (s: InputGroupSize) => {
  const pad = s === 'sm' ? '0.25rem 0.5rem' : '0.5rem 1rem'
  const font = s === 'sm' ? '0.875rem' : '1.25rem'
  const radius = s === 'sm' ? 'var(--bs-border-radius-sm)' : 'var(--bs-border-radius-lg)'
  return `
    & > input,
    & > select,
    & > textarea,
    & > button,
    & > .input-group-text {
      padding: ${pad};
      font-size: ${font};
      border-radius: ${radius};
    }
    & > select {
      padding-right: 3rem;
    }
  `
}

// Flex row that joins controls + addons, collapsing the inner border-radii and
// overlapping their 1px borders (matches `.input-group` from the oracle).
const StyledGroup = styled.div<{ $size?: InputGroupSize }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;

  & > input,
  & > select,
  & > textarea {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }
  & > input:focus,
  & > select:focus,
  & > textarea:focus {
    z-index: 5;
  }
  & > button {
    position: relative;
    z-index: 2;
  }
  & > button:focus {
    z-index: 5;
  }

  ${(p) => (p.$size ? sizeCss(p.$size) : '')}

  /* Overlap borders + drop the left radius on every member after the first
     (feedback/tooltip siblings are excluded so validation text can live in the
     group without being pulled under the previous control). */
  & > :not(:first-child):not(.dropdown-menu):not(.valid-feedback):not(.valid-tooltip):not(.invalid-feedback):not(.invalid-tooltip) {
    margin-left: calc(-1 * var(--bs-border-width, 1px));
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  /* Drop the right radius on every member before the last. */
  & > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ size, ...rest }, ref) => <StyledGroup ref={ref} $size={size} {...rest} />,
)
InputGroup.displayName = 'InputGroup'

// Static addon: label / icon / text that sits flush against a control.
// `.input-group-text` — the class is kept so the group's size + radius-collapse
// selectors can target it.
export const InputGroupText = styled.span.attrs({ className: 'input-group-text' })`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  text-align: center;
  white-space: nowrap;
  background-color: var(--bs-tertiary-bg, #f8f9fa);
  border: var(--bs-border-width, 1px) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
`
