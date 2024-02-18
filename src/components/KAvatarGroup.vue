<template>
  <div class="k-avatar-group">
    <k-avatar
      v-for="item in slicedAvatarList"
      :key="item.id"
      :avatar-url="item.avatar"
      :email="item.email"
      :name="item.name"
    />

    <!-- Element to show extra avatar count -->
    <span
      v-if="extraAvatarCount > 0"
      class="k-avatar-extra"
      :title="extraAvatarTitle"
    >
      +{{ extraAvatarCount }}
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import KAvatar from '@/components/KAvatar.vue'
import type { Developer } from '@/types'

export default defineComponent({
  name: 'KAvatarGroup',
  components: {
    KAvatar,
  },
  props: {
    avatarList: {
      type: Array as PropType<Developer[]>,
      required: true,
    },
  },
  computed: {
    maxAvatarCount(): number {
      return 2
    },
    slicedAvatarList(): Developer[] {
      return this.avatarList.slice(0, this.maxAvatarCount)
    },
    extraAvatarCount(): number {
      return this.avatarList.length - this.maxAvatarCount
    },
    extraAvatarTitle(): string {
      let titleString = ''
      const avatarsNotShown = this.avatarList.slice(this.maxAvatarCount)

      avatarsNotShown.forEach((avatar, index) => {
        // Add a new line after each avatar except the last one
        titleString += `${avatar.name} <${avatar.email}> ${index < (avatarsNotShown.length - 1) ? '\n\n' : ''}`
      })

      return titleString
    },
  },
})
</script>
<style lang="scss">
.k-avatar-group {
  display: flex;
}

// For overlapping avatars:
// Add negative margin to all child elements of the group, except the first child
.k-avatar-group>*:not(:first-child) {
  margin-left: -1rem;
}

.k-avatar-extra {
  align-items: center;

  background-color: #F1F1F8;
  border: 1px solid #fff;

  border-radius: 50%;
  color: #777D8A;

  cursor: default;

  display: inline-flex;
  font-size: 1.2rem;
  font-weight: 600;
  height: 3.6rem;
  justify-content: center;
  letter-spacing: 0.2rem;
  width: 3.6rem;
}
</style>
