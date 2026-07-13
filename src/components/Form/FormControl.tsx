import React from 'react'
import styled, { css } from 'styled-components'

export type FormControlSize = 'sm' | 'lg'

// Omit native `size` (number) so we can use it for sm/lg like Bootstrap.
export interface FormControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  size?: FormControlSize
  isInvalid?: boolean
  isValid?: boolean
  /** Render `.form-control-plaintext` — a borderless read-only display control. */
  plaintext?: boolean
  /** Render as a different element, e.g. "textarea". */
  as?: React.ElementType
}

// Exact 5.3.8 validation feedback icons (from parity/oracle/bootstrap.min.css).
const VALID_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1'/%3e%3c/svg%3e\")"
const INVALID_ICON =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\")"

const padding = (s?: FormControlSize) =>
  s === 'sm' ? '0.25rem 0.5rem' : s === 'lg' ? '0.5rem 1rem' : '0.375rem 0.75rem'
const fontSize = (s?: FormControlSize) =>
  s === 'sm' ? '0.875rem' : s === 'lg' ? '1.25rem' : '1rem'
const radius = (s?: FormControlSize) =>
  s === 'sm'
    ? 'var(--bs-border-radius-sm)'
    : s === 'lg'
      ? 'var(--bs-border-radius-lg)'
      : 'var(--bs-border-radius)'
// min-height keeps the box height stable regardless of content (matches oracle).
const minHeight = (s?: FormControlSize) =>
  s === 'sm'
    ? 'calc(1.5em + 0.5rem + calc(var(--bs-border-width) * 2))'
    : s === 'lg'
      ? 'calc(1.5em + 1rem + calc(var(--bs-border-width) * 2))'
      : 'calc(1.5em + 0.75rem + calc(var(--bs-border-width) * 2))'

// Focus ring: border #86b7fe == primary mixed 50% with white; shadow == primary @25%.
const focusRing = css`
  border-color: color-mix(in srgb, var(--bs-primary) 50%, #fff);
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
`

const validation = (
  invalid?: boolean,
  valid?: boolean,
  isTextarea?: boolean,
) => {
  if (!invalid && !valid) return ''
  const color = invalid
    ? 'var(--bs-form-invalid-border-color, var(--bs-danger))'
    : 'var(--bs-form-valid-border-color, var(--bs-success))'
  const icon = invalid ? INVALID_ICON : VALID_ICON
  const shadowRgb = invalid ? 'var(--bs-danger-rgb)' : 'var(--bs-success-rgb)'
  // textarea positions the icon at the top-right corner, inputs vertically center it.
  const position = isTextarea
    ? 'top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem)'
    : 'right calc(0.375em + 0.1875rem) center'
  return css`
    border-color: ${color};
    padding-right: calc(1.5em + 0.75rem);
    background-image: ${icon};
    background-repeat: no-repeat;
    background-position: ${position};
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    &:focus {
      border-color: ${color};
      box-shadow: 0 0 0 0.25rem rgba(${shadowRgb}, 0.25);
    }
  `
}

const StyledControl = styled.input<{
  $size?: FormControlSize
  $invalid?: boolean
  $valid?: boolean
  $plaintext?: boolean
  $textarea?: boolean
  $type?: string
}>`
  ${(p) =>
    p.$plaintext
      ? css`
          display: block;
          width: 100%;
          padding: ${p.$size === 'sm' || p.$size === 'lg'
            ? '0.375rem 0'
            : '0.375rem 0'};
          margin-bottom: 0;
          line-height: 1.5;
          color: var(--bs-body-color);
          background-color: transparent;
          border: solid transparent;
          border-width: var(--bs-border-width) 0;
          &:focus {
            outline: 0;
          }
        `
      : css`
          display: block;
          width: 100%;
          /* Bootstrap only sets min-height on textareas + the -sm/-lg size
             variants; a plain input is content-driven (min-height:auto). Forcing
             the md formula on an unsized input overshoots when an ancestor (e.g.
             .input-group-sm) shrinks its padding. */
          min-height: ${p.$textarea || p.$size ? minHeight(p.$size) : 'auto'};
          padding: ${padding(p.$size)};
          font-size: ${fontSize(p.$size)};
          font-family: inherit;
          font-weight: 400;
          line-height: 1.5;
          color: var(--bs-body-color);
          background-color: var(--bs-body-bg);
          background-clip: padding-box;
          border: var(--bs-border-width) solid var(--bs-border-color);
          border-radius: ${radius(p.$size)};
          appearance: none;
          transition:
            border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;

          &::placeholder {
            color: var(--bs-secondary-color);
            opacity: 1;
          }
          &:focus {
            color: var(--bs-body-color);
            background-color: var(--bs-body-bg);
            ${focusRing}
          }
          &:disabled {
            background-color: var(--bs-secondary-bg);
            opacity: 1;
            cursor: not-allowed;
          }

          /* file input — Bootstrap re-skins the native picker button */
          &[type='file'] {
            overflow: hidden;
          }
          &[type='file']:not(:disabled):not([readonly]) {
            cursor: pointer;
          }
          &::file-selector-button {
            padding: ${padding(p.$size)};
            margin: ${p.$size === 'sm'
              ? '-0.25rem -0.5rem'
              : p.$size === 'lg'
                ? '-0.5rem -1rem'
                : '-0.375rem -0.75rem'};
            margin-inline-end: ${p.$size === 'sm'
              ? '0.5rem'
              : p.$size === 'lg'
                ? '1rem'
                : '0.75rem'};
            color: var(--bs-body-color);
            background-color: var(--bs-tertiary-bg);
            pointer-events: none;
            border-color: inherit;
            border-style: solid;
            border-width: 0;
            border-inline-end-width: var(--bs-border-width);
            border-radius: 0;
            transition:
              color 0.15s ease-in-out,
              background-color 0.15s ease-in-out,
              border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
          }
          &:hover:not(:disabled):not([readonly])::file-selector-button {
            background-color: var(--bs-secondary-bg);
          }

          /* color input */
          ${p.$type === 'color' &&
          css`
            width: 3rem;
            height: ${minHeight(p.$size)};
            padding: ${p.$size === 'sm'
              ? '0.25rem'
              : p.$size === 'lg'
                ? '0.5rem'
                : '0.375rem'};
            &:not(:disabled):not([readonly]) {
              cursor: pointer;
            }
            &::-moz-color-swatch {
              border: 0 !important;
              border-radius: var(--bs-border-radius);
            }
            &::-webkit-color-swatch {
              border: 0 !important;
              border-radius: var(--bs-border-radius);
            }
          `}

          ${validation(p.$invalid, p.$valid, p.$textarea)}
        `}
`

export const FormControl = React.forwardRef<HTMLInputElement, FormControlProps>(
  ({ size, isInvalid, isValid, plaintext, as, type, className, ...rest }, ref) => {
    const isTextarea = as === 'textarea'
    // Emit `.is-invalid` / `.is-valid` so a sibling FormFeedback (which shows via
    // `.is-invalid ~ &`) reacts — matching Bootstrap's control-owns-the-class contract.
    const cls = [className, isInvalid && 'is-invalid', isValid && 'is-valid']
      .filter(Boolean)
      .join(' ')
    return (
      <StyledControl
        ref={ref}
        as={as}
        type={isTextarea ? undefined : type}
        className={cls || undefined}
        $size={size}
        $invalid={isInvalid}
        $valid={isValid}
        $plaintext={plaintext}
        $textarea={isTextarea}
        $type={type}
        {...rest}
      />
    )
  },
)
FormControl.displayName = 'FormControl'
