import React from 'react'
import styled from 'styled-components'
import type { FormControlSize } from './FormControl'

export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: FormControlSize
  isInvalid?: boolean
  isValid?: boolean
}

const CARET =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")"

const StyledSelect = styled.select<{
  $size?: FormControlSize
  $invalid?: boolean
  $valid?: boolean
}>`
  display: block;
  width: 100%;
  padding: ${(p) =>
    p.$size === 'sm'
      ? '0.25rem 2rem 0.25rem 0.5rem'
      : p.$size === 'lg'
        ? '0.5rem 2.25rem 0.5rem 1rem'
        : '0.375rem 2.25rem 0.375rem 0.75rem'};
  font-size: ${(p) => (p.$size === 'sm' ? '0.875rem' : p.$size === 'lg' ? '1.25rem' : '1rem')};
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-image: ${CARET};
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  appearance: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: color-mix(in srgb, var(--bs-primary) 50%, var(--bs-border-color));
    outline: 0;
    box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--bs-primary) 25%, transparent);
  }
  &:disabled {
    background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
    cursor: not-allowed;
  }
  ${(p) => (p.$invalid ? 'border-color: var(--bs-danger);' : p.$valid ? 'border-color: var(--bs-success);' : '')}
`

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ size, isInvalid, isValid, ...rest }, ref) => (
    <StyledSelect ref={ref} $size={size} $invalid={isInvalid} $valid={isValid} {...rest} />
  ),
)
FormSelect.displayName = 'FormSelect'
