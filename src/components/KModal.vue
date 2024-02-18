<template>
  <div class="k-modal">
    <div
      aria-modal="true"
      class="k-modal-container"
      role="dialog"
    >
      <slot name="close">
        <div class="k-modal-close">
          <button @click="$emit('close')">
            X
          </button>
        </div>
      </slot>
      <div class="k-modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KModal',
  emits: ['close'],
  mounted() {
    document.addEventListener('keyup', this.handleKeyup)
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.handleKeyup)
  },
  methods: {
    handleKeyup(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this.$emit('close')
      }
    },
  },
})
</script>

<style lang="scss">
.k-modal {
  align-items: center;
  background-color: rgb(0 0 0 / 0.5);
  display: flex;
  inset: 0px;
  justify-content: center;
  position: fixed;
}

.k-modal-container {
  background-color: #FFFFFF;
  border-radius: 0.4rem;
  box-shadow: 0px 4px 30px 0px #00000033;
  max-height: 50vh;
  max-width: 40vw;
  overflow-y: auto;
}

.k-modal-close {
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;

  button {
    cursor: pointer;
  }
}

.k-modal-content {
  padding: 3.2rem;
  padding-top: 0;
}
</style>
