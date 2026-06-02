import React from 'react'
import styled from 'styled-components'

export type FormCheckType = 'checkbox' | 'radio' | 'switch'

export interface FormCheckProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: FormCheckType
  label?: React.ReactNode
  id?: string
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  min-height: 1.5rem;
`

// checkbox/radio use native `accent-color` (modern, accessible, themeable);
// switch is a custom-styled checkbox toggle.
const CheckInput = styled.input<{ $switch: boolean }>`
  margin: 0;
  cursor: pointer;
  ${(p) =>
    p.$switch
      ? `
    appearance: none;
    width: 2em;
    height: 1em;
    border-radius: 1em;
    background-color: var(--bs-border-color);
    position: relative;
    transition: background-color 0.15s ease-in-out;
    &::before {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      width: calc(1em - 2px);
      height: calc(1em - 2px);
      border-radius: 50%;
      background: #fff;
      transition: transform 0.15s ease-in-out;
    }
    &:checked { background-color: var(--bs-primary); }
    &:checked::before { transform: translateX(1em); }
    &:focus-visible { outline: 0; box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--bs-primary) 25%, transparent); }
  `
      : `
    width: 1em;
    height: 1em;
    accent-color: var(--bs-primary);
  `}
`

const CheckLabel = styled.label`
  cursor: pointer;
  user-select: none;
`

export const FormCheck = React.forwardRef<HTMLInputElement, FormCheckProps>(
  ({ type = 'checkbox', label, id, ...rest }, ref) => {
    const isSwitch = type === 'switch'
    return (
      <Wrapper>
        <CheckInput
          ref={ref}
          id={id}
          type={isSwitch ? 'checkbox' : type}
          role={isSwitch ? 'switch' : undefined}
          $switch={isSwitch}
          {...rest}
        />
        {label != null && <CheckLabel htmlFor={id}>{label}</CheckLabel>}
      </Wrapper>
    )
  },
)
FormCheck.displayName = 'FormCheck'
