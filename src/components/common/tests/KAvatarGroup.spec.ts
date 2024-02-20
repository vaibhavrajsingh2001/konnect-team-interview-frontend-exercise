import { renderToString, mount } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'
import KAvatarGroup from '@/components/common/KAvatarGroup.vue'
import KAvatar from '@/components/common/KAvatar.vue'

const sampleDevList = [
  { id: '62b2988c-4178-48cb-8343-eb15f7924a84', name: 'Timmy Rosenbaum', email: 'Timmy_Rosenbaum@hotmail.com', avatar: 'https://avatars.githubusercontent.com/u/16572492' },
  { id: '3a460c26-0dca-45d8-9d2a-a94202fba68a', name: 'Theodore Aufderhar', email: 'Theodore_Aufderhar@hotmail.com', avatar: 'https://avatars.githubusercontent.com/u/64255661' },
  { id: 'ab49cfc6-04d6-44e8-8d96-f3d7faa2f0a8', name: 'Tanya Ferry', email: 'Tanya.Ferry47@yahoo.com', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/801.jpg' },
  { id: 'e189c250-3eeb-494e-a8ca-31d4b9c23b33', name: 'Clayton Bins', email: 'Clayton_Bins30@gmail.com', avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1126.jpg' },
]
describe('KAvatarGroup', () => {
  it('renders correctly for 2 developers', async () => {
    const wrapper = await renderToString(KAvatarGroup, {
      props: {
        avatarList: sampleDevList.slice(0, 2),
      },
      components: {
        KAvatar,
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('renders extra avatar correctly', async () => {
    const wrapper = mount(KAvatarGroup, {
      props: {
        avatarList: sampleDevList,
      },
      components: {
        KAvatar,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows correct extra avatar count', async () => {
    const wrapper = mount(KAvatarGroup, {
      props: {
        avatarList: sampleDevList,
      },
      components: {
        KAvatar,
      },
    })

    expect(wrapper.findTestId('k-extra-avatar-count').isVisible()).toBe(true)
    expect(wrapper.findTestId('k-extra-avatar-count').text()).toBe('+2')
  })
})
