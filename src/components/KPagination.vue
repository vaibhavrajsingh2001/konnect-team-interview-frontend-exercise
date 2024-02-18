<template>
  <div class="k-pagination">
    <button :disabled="disablePreviousButton" @click="$emit('previous')">
      ←
    </button>

    <span class="current-page">
      {{ firstItemIndex }} to {{ lastItemIndex }}
      <span class="total-count">of {{ totalCount }} services</span>
    </span>

    <button :disabled="disableNextButton" @click="$emit('next')">
      →
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KPagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
  },
  emits: ['next', 'previous'],
  computed: {
    // Return the index of the first item on the current page
    firstItemIndex() {
      /**
       * In case pageSize === 10
       * - If the current page is 1, the first item is 1
       * - If the current page is 2, the first item is 11
       *  and so on
       */
      return ((this.currentPage - 1) * this.pageSize) + 1

    },
    // Return the index of the last item on the current page
    lastItemIndex() {
      // If there is only one page, the total count is the last item index
      // e.g. if there are only 6 items, then only 1 page will be shown, so the last item index will be 6
      if (this.totalPages === 1) return this.totalCount

      // If the current page is the last page, the total count is the last item index
      if (this.currentPage === this.totalPages) return this.totalCount

      /**
       * In case pageSize === 10
       * - If the current page is 1, the last item is 10
       * - If the current page is 2, the last item is 20
       *  and so on
       */
      return this.currentPage * this.pageSize
    },
    disablePreviousButton() {
      return this.currentPage <= 1
    },
    disableNextButton() {
      return this.currentPage >= this.totalPages
    },
  },
})
</script>

<style lang="scss">
.k-pagination {
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  font-size: 1.3rem;

  button {
    padding: 1.2rem;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid #A6C6FF;
    font-size: 1.8rem;
    color: #1456CB;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      color: #0000001A;
      border: 1px solid #0000001A;
    }
  }

  .current-page {
    font-weight: 600;
    color: #3C4557;
    // Fixing the width so that the text doesn't jump around
    // e.g. going from "1 to 10 of 100 services" to "11 to 20 of 100 services" would cause the text to jump
    width: 14.5rem;
    text-align: center;

    .total-count {
      font-weight: 500;
      color: #707888;
    }
  }

}
</style>
