<template>
  <div class="paginator">
    <button
      :disabled="disablePreviousButton"
      @click="$emit('previous')"
    >
      &lt;—
    </button>
    <span>{{ firstItemIndex }} to {{ lastItemIndex }} of {{ totalCount }} services</span>
    <button
      :disabled="disableNextButton"
      @click="$emit('next')"
    >
      —&gt;
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

<style lang="scss" scoped>
.paginator {
  text-align: center;
}
</style>
