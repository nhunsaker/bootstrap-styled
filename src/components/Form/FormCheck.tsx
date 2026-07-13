import React from 'react'
import styled, { css } from 'styled-components'

export type FormCheckType = 'checkbox' | 'radio' | 'switch'

export interface FormCheckProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: FormCheckType
  label?: React.ReactNode
  id?: string
  /** Inline layout (`.form-check-inline`). */
  inline?: boolean
  /** Reverse layout — label first, input right (`.form-check-reverse`). */
  reverse?: boolean
  /** Toggle-button style (`.btn-check` + a `.btn` label). */
  button?: boolean
  /** Button variant when `button` is set (default "outline-primary"). */
  buttonVariant?: string
  isInvalid?: boolean
  isValid?: boolean
}

// --- Exact 5.3.8 background SVGs (parity/oracle/bootstrap.min.css) ---
const CHECK_SVG =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e\")"
const RADIO_SVG =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e\")"
const INDETERMINATE_SVG =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e\")"
const SWITCH_BG_DEFAULT =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e\")"
const SWITCH_BG_FOCUS =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e\")"
const SWITCH_BG_CHECKED =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\")"
const SWITCH_BG_UNCHECKED =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e\")"

const Wrapper = styled.div<{ $inline?: boolean; $reverse?: boolean; $switch?: boolean }>`
  display: ${(p) => (p.$inline ? 'inline-block' : 'block')};
  min-height: 1.5rem;
  margin-bottom: 0.125rem;
  ${(p) => p.$inline && 'margin-right: 1rem;'}
  ${(p) =>
    p.$reverse
      ? css`
          padding-right: ${p.$switch ? '2.5em' : '1.5em'};
          padding-left: 0;
          text-align: right;
        `
      : css`
          padding-left: ${p.$switch ? '2.5em' : '1.5em'};
        `}
`

const CheckInput = styled.input<{
  $switch?: boolean
  $reverse?: boolean
  $invalid?: boolean
  $valid?: boolean
}>`
  --bs-form-check-bg: var(--bs-body-bg);
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  appearance: none;
  background-color: var(--bs-form-check-bg);
  background-image: var(--bs-form-check-bg-image);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: var(--bs-border-width) solid var(--bs-border-color);
  print-color-adjust: exact;
  cursor: pointer;
  ${(p) =>
    p.$reverse
      ? css`
          float: right;
          margin-right: ${p.$switch ? '-2.5em' : '-1.5em'};
          margin-left: 0;
        `
      : css`
          float: left;
          margin-left: ${p.$switch ? '-2.5em' : '-1.5em'};
        `}

  &[type='checkbox'] {
    border-radius: 0.25em;
  }
  &[type='radio'] {
    border-radius: 50%;
  }

  &:active {
    filter: brightness(90%);
  }
  &:focus {
    border-color: color-mix(in srgb, var(--bs-primary) 50%, #fff);
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
  }
  &:checked {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
  }
  &:checked[type='checkbox'] {
    --bs-form-check-bg-image: ${CHECK_SVG};
  }
  &:checked[type='radio'] {
    --bs-form-check-bg-image: ${RADIO_SVG};
  }
  &[type='checkbox']:indeterminate {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    --bs-form-check-bg-image: ${INDETERMINATE_SVG};
  }
  &:disabled {
    pointer-events: none;
    filter: none;
    opacity: 0.5;
  }

  ${(p) =>
    p.$switch &&
    css`
      --bs-form-switch-bg: ${SWITCH_BG_DEFAULT};
      width: 2em;
      background-image: var(--bs-form-switch-bg);
      background-position: left center;
      border-radius: 2em;
      transition: background-position 0.15s ease-in-out;

      &:not(:checked):not(:focus) {
        --bs-form-switch-bg: ${SWITCH_BG_UNCHECKED};
      }
      &:focus {
        --bs-form-switch-bg: ${SWITCH_BG_FOCUS};
      }
      &:checked {
        background-position: ${p.$reverse ? 'left center' : 'right center'};
        --bs-form-switch-bg: ${SWITCH_BG_CHECKED};
      }
    `}

  ${(p) =>
    (p.$invalid || p.$valid) &&
    css`
      border-color: ${p.$invalid
        ? 'var(--bs-form-invalid-border-color, var(--bs-danger))'
        : 'var(--bs-form-valid-border-color, var(--bs-success))'};
      &:checked {
        background-color: ${p.$invalid
          ? 'var(--bs-form-invalid-color, var(--bs-danger))'
          : 'var(--bs-form-valid-color, var(--bs-success))'};
      }
      &:focus {
        box-shadow: 0 0 0 0.25rem
          rgba(${p.$invalid ? 'var(--bs-danger-rgb)' : 'var(--bs-success-rgb)'}, 0.25);
      }
    `}
`

const CheckLabel = styled.label<{ $invalid?: boolean; $valid?: boolean }>`
  cursor: pointer;
  user-select: none;
  ${(p) =>
    (p.$invalid || p.$valid) &&
    css`
      color: ${p.$invalid
        ? 'var(--bs-form-invalid-color, var(--bs-danger))'
        : 'var(--bs-form-valid-color, var(--bs-success))'};
    `}
  ${CheckInput}:disabled ~ &,
  ${CheckInput}[disabled] ~ & {
    cursor: default;
    opacity: 0.5;
  }
`

// --- Button-style toggle (.btn-check) ---
const BtnCheckInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`

const BtnCheckLabel = styled.label<{ $variant: string }>`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: var(--bs-border-width) solid transparent;
  border-radius: var(--bs-border-radius);
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  ${(p) => {
    const outline = p.$variant.startsWith('outline-')
    const color = outline ? p.$variant.slice('outline-'.length) : p.$variant
    const token = `var(--bs-${color})`
    const rgb = `var(--bs-${color}-rgb)`
    return outline
      ? css`
          color: ${token};
          border-color: ${token};
          background-color: transparent;
          ${BtnCheckInput}:checked + & {
            color: #fff;
            background-color: ${token};
            border-color: ${token};
          }
          ${BtnCheckInput}:focus-visible + & {
            box-shadow: 0 0 0 0.25rem rgba(${rgb}, 0.5);
          }
          ${BtnCheckInput}:disabled + &,
          ${BtnCheckInput}[disabled] + & {
            pointer-events: none;
            opacity: 0.65;
          }
        `
      : css`
          color: #fff;
          background-color: ${token};
          border-color: ${token};
          ${BtnCheckInput}:checked + & {
            filter: brightness(90%);
          }
          ${BtnCheckInput}:focus-visible + & {
            box-shadow: 0 0 0 0.25rem rgba(${rgb}, 0.5);
          }
          ${BtnCheckInput}:disabled + &,
          ${BtnCheckInput}[disabled] + & {
            pointer-events: none;
            opacity: 0.65;
          }
        `
  }}
`

export const FormCheck = React.forwardRef<HTMLInputElement, FormCheckProps>(
  (
    {
      type = 'checkbox',
      label,
      id,
      inline,
      reverse,
      button,
      buttonVariant = 'outline-primary',
      isInvalid,
      isValid,
      className,
      ...rest
    },
    ref,
  ) => {
    const isSwitch = type === 'switch'
    const nativeType = isSwitch ? 'checkbox' : type
    // Emit `.is-invalid` / `.is-valid` on the INPUT so a sibling FormFeedback
    // reacts (`.is-invalid ~ .invalid-feedback`). The caller's `className` (e.g.
    // spacing utilities like `mb-3`) belongs on the `.form-check` WRAPPER —
    // matching Bootstrap's `<div class="form-check mb-3">` — not the input.
    const inputCls =
      [isInvalid && 'is-invalid', isValid && 'is-valid'].filter(Boolean).join(' ') || undefined

    if (button) {
      return (
        <>
          <BtnCheckInput ref={ref} id={id} type={nativeType} className={className} {...rest} />
          <BtnCheckLabel htmlFor={id} $variant={buttonVariant}>
            {label}
          </BtnCheckLabel>
        </>
      )
    }

    const input = (
      <CheckInput
        ref={ref}
        id={id}
        type={nativeType}
        role={isSwitch ? 'switch' : undefined}
        className={inputCls}
        $switch={isSwitch}
        $reverse={reverse}
        $invalid={isInvalid}
        $valid={isValid}
        {...rest}
      />
    )
    const labelEl = label != null && (
      <CheckLabel htmlFor={id} $invalid={isInvalid} $valid={isValid}>
        {label}
      </CheckLabel>
    )

    // DOM order stays input-then-label; `.form-check-reverse` floats the input
    // right (matching Bootstrap markup, which keeps this order + uses float).
    return (
      <Wrapper className={className} $inline={inline} $reverse={reverse} $switch={isSwitch}>
        {input}
        {labelEl}
      </Wrapper>
    )
  },
)
FormCheck.displayName = 'FormCheck'
