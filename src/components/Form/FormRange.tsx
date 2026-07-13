import React from 'react'
import styled, { css } from 'styled-components'

export interface FormRangeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

// Shared thumb declarations (WebKit + Moz share the same box; only the
// pseudo-element selectors differ, so each is written out explicitly below).
const thumbBase = css`
  width: 1rem;
  height: 1rem;
  background-color: var(--bs-primary);
  border: 0;
  border-radius: 1rem;
  transition:
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
`
const trackBase = css`
  width: 100%;
  height: 0.5rem;
  color: transparent;
  cursor: pointer;
  background-color: var(--bs-secondary-bg);
  border-color: transparent;
  border-radius: 1rem;
`
// Focus ring — 0 0 0 1px #fff, 0 0 0 .25rem rgba(primary, .25) (exact oracle).
const thumbFocusShadow = '0 0 0 1px #fff, 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25)'
// Active thumb — #b6d4fe == primary mixed 30% with white.
const thumbActive = 'color-mix(in srgb, var(--bs-primary) 30%, #fff)'

const StyledRange = styled.input.attrs({ type: 'range' })`
  width: 100%;
  height: 1.5rem;
  padding: 0;
  appearance: none;
  background-color: transparent;

  &:focus {
    outline: 0;
  }
  &:focus::-webkit-slider-thumb {
    box-shadow: ${thumbFocusShadow};
  }
  &:focus::-moz-range-thumb {
    box-shadow: ${thumbFocusShadow};
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -0.25rem;
    ${thumbBase}
  }
  &::-webkit-slider-thumb:active {
    background-color: ${thumbActive};
  }
  &::-webkit-slider-runnable-track {
    ${trackBase}
  }

  &::-moz-range-thumb {
    appearance: none;
    ${thumbBase}
  }
  &::-moz-range-thumb:active {
    background-color: ${thumbActive};
  }
  &::-moz-range-track {
    ${trackBase}
  }

  &:disabled {
    pointer-events: none;
  }
  &:disabled::-webkit-slider-thumb {
    background-color: var(--bs-secondary-color);
  }
  &:disabled::-moz-range-thumb {
    background-color: var(--bs-secondary-color);
  }
`

export const FormRange = React.forwardRef<HTMLInputElement, FormRangeProps>(
  (props, ref) => <StyledRange ref={ref} {...props} />,
)
FormRange.displayName = 'FormRange'
