import { mount, renderToString } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import KPagination from '@/components/common/KPagination.vue'

describe('KPagination', () => {
  it('renders correctly', async () => {
    const wrapper = await renderToString(KPagination, {
      props: {
        totalPages: 5,
        currentPage: 2,
        pageSize: 10,
        totalCount: 50,
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the correct page range and total count', () => {
    const wrapper = mount(KPagination, {
      props: {
        totalPages: 5,
        currentPage: 2,
        pageSize: 10,
        totalCount: 50,
      },
    })

    expect(wrapper.findTestId('current-page-label').text()).toBe('11 to 20 of 50 services')
  })

  it('disables the previous button on the first page', () => {
    const wrapper = mount(KPagination, {
      props: {
        totalPages: 5,
        currentPage: 1,
        pageSize: 10,
        totalCount: 50,
      },
    })

    expect(wrapper.findTestId<'button'>('previous-button').attributes().disabled).toBeDefined()
  })

  it('disables the next button on the last page', () => {
    const wrapper = mount(KPagination, {
      props: {
        totalPages: 5,
        currentPage: 5,
        pageSize: 10,
        totalCount: 50,
      },
    })

    expect(wrapper.findTestId<'button'>('next-button').attributes().disabled).toBeDefined()
  })

  it('enables both previous and next buttons on a middle page', () => {
    const wrapper = mount(KPagination, {
      props: {
        totalPages: 5,
        currentPage: 3,
        pageSize: 10,
        totalCount: 50,
      },
    })

    expect(wrapper.findTestId<'button'>('previous-button').attributes().disabled).toBeUndefined()
    expect(wrapper.findTestId<'button'>('next-button').attributes().disabled).toBeUndefined()
  })

  it('displays the correct last item index when there is only one page', () => {
    const wrapper = mount(KPagination, {
      props: {
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
        totalCount: 6,
      },
    })

    expect(wrapper.findTestId('current-page-label').text()).toBe('1 to 6 of 6 services')
  })

  it('displays the correct last item index on the last page', () => {
    const wrapper = mount(KPagination, {
      props: {
        totalPages: 5,
        currentPage: 5,
        pageSize: 10,
        totalCount: 50,
      },
    })

    expect(wrapper.findTestId('current-page-label').text()).toBe('41 to 50 of 50 services')
  })

  it('emits the correct events when the buttons are clicked', async () => {
    const wrapper = mount(KPagination, {
      props: {
        totalPages: 5,
        currentPage: 3,
        pageSize: 10,
        totalCount: 50,
      },
    })

    await wrapper.findTestId<'button'>('next-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('next')

    await wrapper.findTestId<'button'>('previous-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('previous')
  })
})
