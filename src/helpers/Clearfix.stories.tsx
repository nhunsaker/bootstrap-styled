import type { Story } from '@ladle/react'
import { Clearfix } from './Clearfix'

export default { title: 'Helpers/Clearfix' }

export const Basic: Story = () => (
  <Clearfix style={{ background: '#e9ecef', padding: '0.5rem' }}>
    <button style={{ float: 'left' }} type="button">
      Float left
    </button>
    <button style={{ float: 'right' }} type="button">
      Float right
    </button>
  </Clearfix>
)
