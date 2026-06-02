import styled from 'styled-components'

// Flex row that joins controls + addons, collapsing inner border-radii.
export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;

  & > input,
  & > select,
  & > textarea {
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }

  & > :not(:first-child) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  & > :not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const InputGroupText = styled.span`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  text-align: center;
  white-space: nowrap;
  background-color: color-mix(in srgb, var(--bs-body-color) 8%, var(--bs-body-bg));
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
`
