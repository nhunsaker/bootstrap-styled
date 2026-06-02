import React from 'react'
import styled from 'styled-components'

export type FormControlSize = 'sm' | 'lg'

// Omit native `size` (number) so we can use it for sm/lg like Bootstrap.
export interface FormControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: FormControlSize
  isInvalid?: boolean
  isValid?: boolean
  /** Render as a different element, e.g. "textarea". */
  as?: React.ElementType
}

const padding = (s?: FormControlSize) =>
  s === 'sm' ? '0.25rem 0.5rem' : s === 'lg' ? '0.5rem 1rem' : '0.375rem 0.75rem'
const fontSize = (s?: FormControlSize) =>
  s === 'sm' ? '0.875rem' : s === 'lg' ? '1.25rem' : '1rem'

const validation = (invalid?: boolean, valid?: boolean) => {
  const c = invalid ? 'var(--bs-danger)' : valid ? 'var(--bs-success)' : null
  if (!c) return ''
  return `
    border-color: ${c};
    &:focus {
      border-color: ${c};
      box-shadow: 0 0 0 0.25rem color-mix(in srgb, ${c} 25%, transparent);
    }
  `
}

const StyledControl = styled.input<{
  $size?: FormControlSize
  $invalid?: boolean
  $valid?: boolean
}>`
  display: block;
  width: 100%;
  padding: ${(p) => padding(p.$size)};
  font-size: ${(p) => fontSize(p.$size)};
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: 1px solid var(--bs-border-color);
  border-radius: ${(p) =>
    p.$size === 'sm'
      ? 'var(--bs-border-radius-sm)'
      : p.$size === 'lg'
        ? 'var(--bs-border-radius-lg)'
        : 'var(--bs-border-radius)'};
  appearance: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &::placeholder {
    color: var(--bs-secondary);
    opacity: 1;
  }
  &:focus {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: color-mix(in srgb, var(--bs-primary) 50%, var(--bs-border-color));
    outline: 0;
    box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--bs-primary) 25%, transparent);
  }
  &:disabled {
    background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
    opacity: 1;
    cursor: not-allowed;
  }

  ${(p) => validation(p.$invalid, p.$valid)}
`

export const FormControl = React.forwardRef<HTMLInputElement, FormControlProps>(
  ({ size, isInvalid, isValid, ...rest }, ref) => (
    <StyledControl ref={ref} $size={size} $invalid={isInvalid} $valid={isValid} {...rest} />
  ),
)
FormControl.displayName = 'FormControl'
