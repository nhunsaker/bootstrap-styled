import type { Story } from '@ladle/react'
import { InputGroup, InputGroupText } from './InputGroup'
import { FormControl } from './FormControl'
import { FormSelect } from './FormSelect'
import { Button } from '../Button'

export default { title: 'Forms/InputGroup' }

export const Basic: Story = () => (
  <div style={{ maxWidth: 520, display: 'grid', gap: '1rem' }}>
    <InputGroup>
      <InputGroupText>@</InputGroupText>
      <FormControl placeholder="Username" />
    </InputGroup>
    <InputGroup>
      <FormControl placeholder="Recipient's username" />
      <InputGroupText>@example.com</InputGroupText>
    </InputGroup>
    <InputGroup>
      <InputGroupText>$</InputGroupText>
      <FormControl placeholder="Amount" />
      <InputGroupText>.00</InputGroupText>
    </InputGroup>
  </div>
)

export const WithButton: Story = () => (
  <div style={{ maxWidth: 520, display: 'grid', gap: '1rem' }}>
    <InputGroup>
      <FormControl placeholder="Search" />
      <Button variant="outline-secondary">Go</Button>
    </InputGroup>
    <InputGroup>
      <Button variant="outline-secondary">Button</Button>
      <FormControl placeholder="With leading button" />
    </InputGroup>
  </div>
)

export const Sizes: Story = () => (
  <div style={{ maxWidth: 520, display: 'grid', gap: '1rem' }}>
    <InputGroup size="sm">
      <InputGroupText>Small</InputGroupText>
      <FormControl placeholder="sm" />
    </InputGroup>
    <InputGroup>
      <InputGroupText>Default</InputGroupText>
      <FormControl placeholder="default" />
    </InputGroup>
    <InputGroup size="lg">
      <InputGroupText>Large</InputGroupText>
      <FormControl placeholder="lg" />
    </InputGroup>
  </div>
)

export const WithSelect: Story = () => (
  <div style={{ maxWidth: 520 }}>
    <InputGroup>
      <InputGroupText>Options</InputGroupText>
      <FormSelect defaultValue="">
        <option value="" disabled>
          Choose…
        </option>
        <option value="1">One</option>
        <option value="2">Two</option>
      </FormSelect>
    </InputGroup>
  </div>
)

export const WithCheckbox: Story = () => (
  <div style={{ maxWidth: 520, display: 'grid', gap: '1rem' }}>
    <InputGroup>
      <InputGroupText>
        <input type="checkbox" aria-label="Checkbox for following text input" />
      </InputGroupText>
      <FormControl placeholder="Checkbox addon" />
    </InputGroup>
    <InputGroup>
      <InputGroupText>
        <input type="radio" aria-label="Radio button for following text input" />
      </InputGroupText>
      <FormControl placeholder="Radio addon" />
    </InputGroup>
  </div>
)

export const Wrapping: Story = () => (
  <div style={{ maxWidth: 220 }}>
    <InputGroup>
      <InputGroupText>Long addon that forces wrapping</InputGroupText>
      <FormControl placeholder="Narrow" />
    </InputGroup>
  </div>
)
