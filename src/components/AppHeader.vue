<template>
  <header>
    <div class="nav">
      <router-link to="/">
        <img
          alt="Kong logo"
          src="/kong-logo.png"
        >
      </router-link>
      <div class="org-setting">
        <span>Organization</span>
        <span>Settings</span>
      </div>
    </div>

    <div class="profile">
      <div class="avatar-container">
        <img
          alt="default avatar icon"
          height="16px"
          src="/icons/default-avatar.svg"
          width="14px"
        >
      </div>
      <span>Katherine Ellis</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppHeader',
})
</script>

<style lang="scss" scoped>
header {
  align-items: center;

  color: rgb(255 255 255 / 0.8);
  display: flex;
  height: 7rem;
  justify-content: space-between;
  position: sticky;
  top: 0;
}

.nav {
  align-items: center;

  background: linear-gradient(180deg, #09224F 0%, #073382 100%);
  display: flex;

  flex-grow: 1;

  font-size: 1.5rem;
  font-weight: 600;
  height: 100%;
  justify-content: space-between;
  letter-spacing: 0em;
  line-height: 1.8rem;
  padding: 0 1.8rem;
}

.org-setting {
  column-gap: 2.6rem;
  display: flex
}

.profile {
  align-items: center;
  background: #072863;
  column-gap: 1.6rem;
  display: flex;
  font-weight: 500;
  height: 100%;
  padding: 0 2rem;
}

.avatar-container {
  align-items: center;
  background-color: #0A7FAE;
  border-radius: 100%;

  display: flex;
  height: 3rem;
  justify-content: center;
  width: 3rem;
}
</style>
