import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ServiceVersionCard from '@/components/service/ServiceVersionCard.vue'
import type { Developer } from '@/types'

describe('ServiceVersionCard', () => {
  it('renders correctly with no developers', () => {
    const wrapper = shallowMount(ServiceVersionCard, {
      props: {
        name: '1.0.0',
        description: 'Test description',
        type: 'HTTP',
        updatedAt: '2022-01-01T00:00:00Z',
      },
    })

    expect(wrapper.find('.version-name').text()).to.equal('v1.0.0')
    expect(wrapper.find('.version-description').text()).to.equal('Test description')
    expect(wrapper.find('.service-type').text()).to.equal('HTTP')
    expect(wrapper.find('.service-type').classes()).toContain('http-bg-color')

    // Test if developer-details is not rendered
    expect(wrapper.find('.developer-details').exists()).toBeFalsy()

    // Test snapshot
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with developers', () => {
    const developer: Developer = { id: 'e06778e0-d298-4bc7-a2fe-db9c4b371f39', name: 'Oscar Brown', email: 'Oscar.Brown87@yahoo.com', avatar: 'https://avatars.githubusercontent.com/u/55118358' }

    const wrapper = shallowMount(ServiceVersionCard, {
      props: {
        name: '1.0.0',
        description: 'Test description',
        type: 'REST',
        updatedAt: '2022-01-01T00:00:00Z',
        developer,
      },
      global: {
        stubs: {
          KAvatar: true,
        },
      },
    })

    // Test correct class is apllied when type is REST
    expect(wrapper.find('.service-type').text()).to.equal('REST')
    expect(wrapper.find('.service-type').classes()).toContain('rest-bg-color')
    // Test if developer-details is rendered
    expect(wrapper.find('.developer-details').exists()).toBeTruthy()
    expect(wrapper.find('.developer-name').text()).to.equal(developer.name)

    // Test snapshot
    expect(wrapper.html()).toMatchSnapshot()
  })
})
