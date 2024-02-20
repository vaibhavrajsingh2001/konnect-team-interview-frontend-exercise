import { renderToString } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'
import AppHeader from '@/components/common/AppHeader.vue'

describe('AppHeader', () => {
  it('renders correctly', async () => {
    const wrapper = await renderToString(AppHeader)
    expect(wrapper).toMatchSnapshot()
  })
})
