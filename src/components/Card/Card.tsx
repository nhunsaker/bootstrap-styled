import styled from 'styled-components'

// Bootstrap card + common sub-parts. Plain styled exports (compose freely).
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  background-clip: border-box;
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
`

export const CardBody = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1rem;
`

export const CardTitle = styled.h5`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

export const CardSubtitle = styled.h6`
  margin-top: -0.25rem;
  margin-bottom: 0.5rem;
  color: var(--bs-secondary);
`

export const CardText = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
`

export const CardHeader = styled.div`
  padding: 0.5rem 1rem;
  background-color: color-mix(in srgb, var(--bs-body-color) 3%, var(--bs-body-bg));
  border-bottom: 1px solid var(--bs-border-color);
`

export const CardFooter = styled.div`
  padding: 0.5rem 1rem;
  background-color: color-mix(in srgb, var(--bs-body-color) 3%, var(--bs-body-bg));
  border-top: 1px solid var(--bs-border-color);
`
