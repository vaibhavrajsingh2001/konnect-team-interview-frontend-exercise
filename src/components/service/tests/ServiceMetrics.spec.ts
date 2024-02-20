import { renderToString } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'
import ServiceMetrics from '@/components/service/ServiceMetrics.vue'

describe('ServiceMetrics', () => {
  it('renders correctly for all passing metrics', async () => {
    const wrapper = await renderToString(ServiceMetrics, {
      props: {
        latency: 0.42,
        uptime: 0.9607,
        requests: 31067,
        errors: 0.0724,
      }
      ,
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly for all failing metrics', async () => {
    const wrapper = await renderToString(ServiceMetrics, {
      props: {
        latency: 1.62,
        uptime: 0.6607,
        requests: 31067,
        errors: 0.4724,
      }
      ,
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly for all warning metrics', async () => {
    const wrapper = await renderToString(ServiceMetrics, {
      props: {
        latency: 0.6,
        uptime: 0.8,
        requests: 31067,
        errors: 0.2,
      }
      ,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
