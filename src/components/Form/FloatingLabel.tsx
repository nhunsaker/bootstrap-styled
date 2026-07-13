import React from 'react'
import styled from 'styled-components'

export interface FloatingLabelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The floating label text. */
  label: React.ReactNode
  /** id wired to the control + the label's `htmlFor` (auto-generated if omitted). */
  controlId?: string
  /** A single control: `<FormControl>`, `<FormControl as="textarea">`, or `<FormSelect>`. */
  children: React.ReactElement<{ id?: string; placeholder?: string }>
}

// `.form-floating` — exact from the 5.3.8 oracle. The control is sized to a
// fixed 3.5rem box; the label sits absolutely over it and shrinks/rises when the
// control is focused or filled (`:not(:placeholder-shown)`), or always for a
// `<select>`. Element-qualified selectors (0,1,1) override the control's own
// padding/height rules (0,1,0) without touching engineer A's components.
const Wrapper = styled.div`
  position: relative;

  & > input,
  & > select,
  & > textarea {
    height: calc(3.5rem + calc(var(--bs-border-width, 1px) * 2));
    min-height: calc(3.5rem + calc(var(--bs-border-width, 1px) * 2));
    line-height: 1.25;
  }

  & > input,
  & > textarea {
    padding: 1rem 0.75rem;
  }
  & > input::placeholder,
  & > textarea::placeholder {
    color: transparent;
  }
  & > input:focus,
  & > input:not(:placeholder-shown),
  & > textarea:focus,
  & > textarea:not(:placeholder-shown) {
    padding-top: 1.625rem;
    padding-bottom: 0.625rem;
  }
  & > select {
    padding-top: 1.625rem;
    padding-bottom: 0.625rem;
    padding-left: 0.75rem;
  }

  & > label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    max-width: 100%;
    height: 100%;
    padding: 1rem 0.75rem;
    overflow: hidden;
    color: rgba(var(--bs-body-color-rgb, 33, 37, 41), 0.65);
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
    border: var(--bs-border-width, 1px) solid transparent;
    transform-origin: 0 0;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    & > label {
      transition: none;
    }
  }

  & > input:focus ~ label,
  & > input:not(:placeholder-shown) ~ label,
  & > textarea:focus ~ label,
  & > textarea:not(:placeholder-shown) ~ label,
  & > select ~ label {
    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
  }

  /* Masks the textarea's border line where the floated label crosses it. */
  & > textarea:focus ~ label::after,
  & > textarea:not(:placeholder-shown) ~ label::after {
    position: absolute;
    inset: 1rem 0.375rem;
    z-index: -1;
    height: 1.5em;
    content: '';
    background-color: var(--bs-body-bg);
    border-radius: var(--bs-border-radius);
  }

  & > input:disabled ~ label,
  & > :disabled ~ label {
    color: #6c757d;
  }
`

export const FloatingLabel = React.forwardRef<HTMLDivElement, FloatingLabelProps>(
  ({ label, controlId, children, ...rest }, ref) => {
    const generatedId = React.useId()
    const id = controlId ?? children.props.id ?? generatedId
    // Floating needs a placeholder present so `:placeholder-shown` toggles the
    // label; a `<select>` always shows a value so it doesn't need one.
    const control = React.cloneElement(children, {
      id,
      placeholder: children.props.placeholder ?? ' ',
    })
    return (
      <Wrapper ref={ref} {...rest}>
        {control}
        <label htmlFor={id}>{label}</label>
      </Wrapper>
    )
  },
)
FloatingLabel.displayName = 'FloatingLabel'
