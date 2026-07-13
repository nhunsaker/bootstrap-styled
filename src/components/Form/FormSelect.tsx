import React from 'react'
import styled, { css } from 'styled-components'
import type { FormControlSize } from './FormControl'

export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: FormControlSize
  isInvalid?: boolean
  isValid?: boolean
}

// Exact 5.3.8 caret (light / dark) + validation feedback icons.
const CARET_LIGHT =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")"
const CARET_DARK =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23dee2e6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")"
const VALID_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1'/%3e%3c/svg%3e\")"
const INVALID_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\")"

const selectValidation = (invalid?: boolean, valid?: boolean) => {
  if (!invalid && !valid) return ''
  const color = invalid
    ? 'var(--bs-form-invalid-border-color, var(--bs-danger))'
    : 'var(--bs-form-valid-border-color, var(--bs-success))'
  const icon = invalid ? INVALID_ICON : VALID_ICON
  const shadowRgb = invalid ? 'var(--bs-danger-rgb)' : 'var(--bs-success-rgb)'
  return css`
    border-color: ${color};
    /* only single selects show the icon (oracle: :not([multiple]):not([size])) */
    &:not([multiple]):not([size]),
    &:not([multiple])[size='1'] {
      padding-right: 4.125rem;
      background-image: var(--bs-form-select-bg-img), ${icon};
      background-position:
        right 0.75rem center,
        center right 2.25rem;
      background-size:
        16px 12px,
        calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
    &:focus {
      border-color: ${color};
      box-shadow: 0 0 0 0.25rem rgba(${shadowRgb}, 0.25);
    }
  `
}

const StyledSelect = styled.select<{
  $size?: FormControlSize
  $invalid?: boolean
  $valid?: boolean
}>`
  --bs-form-select-bg-img: ${CARET_LIGHT};
  display: block;
  width: 100%;
  padding: ${(p) =>
    p.$size === 'sm'
      ? '0.25rem 2.25rem 0.25rem 0.5rem'
      : p.$size === 'lg'
        ? '0.5rem 2.25rem 0.5rem 1rem'
        : '0.375rem 2.25rem 0.375rem 0.75rem'};
  font-size: ${(p) => (p.$size === 'sm' ? '0.875rem' : p.$size === 'lg' ? '1.25rem' : '1rem')};
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: ${(p) =>
    p.$size === 'sm'
      ? 'var(--bs-border-radius-sm)'
      : p.$size === 'lg'
        ? 'var(--bs-border-radius-lg)'
        : 'var(--bs-border-radius)'};
  appearance: none;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  [data-bs-theme='dark'] & {
    --bs-form-select-bg-img: ${CARET_DARK};
  }

  &:focus {
    border-color: color-mix(in srgb, var(--bs-primary) 50%, #fff);
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
  }
  /* multi-row / multiple selects drop the caret and its padding */
  &[multiple],
  &[size]:not([size='1']) {
    padding-right: 0.75rem;
    background-image: none;
  }
  &:disabled {
    background-color: var(--bs-secondary-bg);
    cursor: not-allowed;
  }
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 var(--bs-body-color);
  }

  ${(p) => selectValidation(p.$invalid, p.$valid)}
`

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ size, isInvalid, isValid, className, ...rest }, ref) => {
    const cls = [className, isInvalid && 'is-invalid', isValid && 'is-valid']
      .filter(Boolean)
      .join(' ')
    return (
      <StyledSelect
        ref={ref}
        className={cls || undefined}
        $size={size}
        $invalid={isInvalid}
        $valid={isValid}
        {...rest}
      />
    )
  },
)
FormSelect.displayName = 'FormSelect'
