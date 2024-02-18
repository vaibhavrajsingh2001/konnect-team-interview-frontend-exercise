<template>
  <app-header />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
  },
})
</script>

<style lang="scss">
// Unscoped styles for html and body

*,
::before,
::after {
  box-sizing: border-box;
}

html {
  box-sizing: border-box;
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  background-color: #F8F8FA;
  color: #3C4557;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}
</style>
