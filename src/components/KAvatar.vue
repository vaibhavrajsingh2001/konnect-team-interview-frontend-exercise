<template>
  <img
    :alt="name"
    class="k-avatar"
    :src="avatarUrl"
    :title="title"
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KAvatar',
  props: {
    avatarUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  computed: {
    title(): string {
      return `${this.name} <${this.email}>`
    },
  },
})
</script>
<style lang="scss">
.k-avatar {
  height: 3.6rem;
  width: 3.6rem;
  border-radius: 50%;
}
</style>
