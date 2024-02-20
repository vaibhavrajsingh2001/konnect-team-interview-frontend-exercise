<template>
  <div
    class="k-modal"
    @click="handleModalClick"
    @touchstart="handleModalClick"
  >
    <div
      aria-modal="true"
      class="k-modal-container"
      role="dialog"
    >
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
    // Close the modal if the user clicks outside of the modal content
    handleModalClick(e: MouseEvent | TouchEvent): void {

      if (e.target === e.currentTarget) {
        this.$emit('close')
      }
      // When clicking inside modal, target !== currentTarget => { target: p.versions, currentTarget: div.k-modal }
      // When clicking outside modal, target === currentTarget => { target: div.k-modal, currentTarget: div.k-modal }
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

  @media screen and (max-width: 960px){
    align-items: end;
  }
}

.k-modal-container {
  background-color: #FFFFFF;
  border-radius: 0.4rem;
  box-shadow: 0px 4px 30px 0px #00000033;
  max-height: 50vh;
  max-width: 83rem;
  overflow-y: auto;
}

.k-modal-content {
  padding: 3.2rem;
}
</style>
