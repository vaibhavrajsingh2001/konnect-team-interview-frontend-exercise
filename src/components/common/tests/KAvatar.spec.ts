import { renderToString } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'
import KAvatar from '@/components/common/KAvatar.vue'

describe('KAvatar', () => {
  it('renders correctly', async () => {
    const wrapper = await renderToString(KAvatar, {
      props: {
        avatarUrl: 'https://example.com/image.jpg',
        name: 'Example image',
        email: 'sample@sample.com',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
