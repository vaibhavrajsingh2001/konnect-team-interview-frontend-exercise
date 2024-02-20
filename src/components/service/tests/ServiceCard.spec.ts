import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ServiceCard from '@/components/service/ServiceCard.vue'

describe('ServiceCard', () => {
  const metrics = {
    latency: 0.5, uptime: 0.9278, requests: 248393, errors: 0.0244,
  }
  const developers = [
    { id: 'e06778e0-d298-4bc7-a2fe-db9c4b371f39', name: 'Oscar Brown', email: 'Oscar.Brown87@yahoo.com', avatar: 'https://avatars.githubusercontent.com/u/55118358' },
    { id: '2564a49a-2e3e-4dab-88c9-b10f895c1c84', name: 'Oscar Morissette', email: 'Oscar_Morissette57@gmail.com', avatar: 'https://avatars.githubusercontent.com/u/7590420' },
    { id: '71648bd0-1459-4d11-a698-abe58f4fefb4', name: 'Shaun Cronin', email: 'Shaun.Cronin91@gmail.com', avatar: 'https://avatars.githubusercontent.com/u/36033772' },
  ]

  it('renders correctly with no metrics or developers', () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        name: 'Test Service',
        description: 'This is a test service',
        versionCount: 2,
        published: true,
        configured: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with metrics and developers', () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        name: 'Test Service',
        description: 'This is a test service',
        versionCount: 1,
        published: false,
        configured: true,
        metrics,
        developers,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the correct service data', () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        name: 'Test Service',
        description: 'This is a test service',
        versionCount: 2,
        published: true,
        configured: true,
      },
    })

    expect(wrapper.find('.service-card-header span').text()).toBe('Published to portal')
    expect(wrapper.find('.version-badge').text()).toBe('2 versions')
    expect(wrapper.find('.service-name').text()).toBe('Test Service')
    expect(wrapper.find('.service-description').text()).toBe('This is a test service')
  })

  it('renders the ServiceMetrics component when metrics prop is provided', () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        name: 'Test Service',
        description: 'This is a test service',
        versionCount: 2,
        published: true,
        configured: true,
        metrics,
      },
    })

    expect(wrapper.findComponent({ name: 'ServiceMetrics' }).exists()).toBe(true)
  })

  it('renders the KAvatarGroup component when developers prop is provided', () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        name: 'Test Service',
        description: 'This is a test service',
        versionCount: 2,
        published: true,
        configured: true,
        developers,
      },
    })

    expect(wrapper.findComponent({ name: 'KAvatarGroup' }).exists()).toBe(true)
  })
})
