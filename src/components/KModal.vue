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
            &#x58;
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
  margin: 0 4rem;
  max-height: 50vh;
  max-width: 83rem;
  overflow-y: auto;
}

.k-modal-close {
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;
  padding-bottom: 0rem;

  button {
    align-items: center;
    background-color: #BDD3F9FF;
    border: 1px solid #00000033;
    border-radius: 50%;
    color: #003694FF;
    cursor: pointer;
    display: inline-flex;
    font-size: 1.6rem;
    font-weight: 600;
    height: 3rem;
    justify-content: center;
    padding: 1rem;
    width: 3rem;

    &:hover {
      background-color: #8AB3FAFF;
    }
  }
}

.k-modal-content {
  padding: 3.2rem;
  padding-top: 0;
}
</style>
