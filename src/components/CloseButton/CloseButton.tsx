import React from 'react'
import styled from 'styled-components'

const StyledClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
  color: var(--bs-body-color);
  background: transparent;
  border: 0;
  border-radius: var(--bs-border-radius);
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
    background-color: color-mix(in srgb, var(--bs-body-color) 8%, transparent);
  }
`

export type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  (props, ref) => (
    <StyledClose ref={ref} type="button" aria-label="Close" {...props}>
      ×
    </StyledClose>
  ),
)
CloseButton.displayName = 'CloseButton'
