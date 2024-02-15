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
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: rgb(255 255 255 / 0.8);
}

.nav {
  height: 100%;
  padding: 0 1.8rem;

  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(180deg, #09224F 0%, #073382 100%);

  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.8rem;
  letter-spacing: 0em;
}

.org-setting {
  display: flex;
  column-gap: 2.6rem
}

.profile {
  height: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  column-gap: 1.6rem;
  font-weight: 500;
  background: #072863;
}

.avatar-container {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: #0A7FAE;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
