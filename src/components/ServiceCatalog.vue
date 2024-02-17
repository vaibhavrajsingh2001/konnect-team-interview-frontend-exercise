<template>
  <div class="service-catalog">
    <h1>Service Hub</h1>
    <input
      v-model="searchQuery"
      class="search-input"
      data-testid="search-input"
      placeholder="Search services"
      @input="searchHandler"
    >

    <template v-if="paginatedServices.length">
      <ul class="catalog">
        <li
          v-for="service in paginatedServices"
          :key="service.id"
          class="service"
        >
          <div>
            <p>
              {{ service.name }}
            </p>
            <p>{{ service.description }}</p>
          </div>
        </li>
      </ul>

      <k-pagination
        v-bind="paginationParams.props"
        v-on="paginationParams.handlers"
      />
    </template>

    <div
      v-else
      data-testid="no-results"
    >
      No services
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import KPagination from '@/components/KPagination.vue'

import useServices from '@/composables/useServices'
import usePagination from '@/composables/usePagination'

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    KPagination,
  },
  setup() {
    const pageSize = 10

    // Import services from the composable
    const { services, loading, getServices } = useServices()

    const { currentPage, totalPages, totalCount, paginatedServices, nextPage, previousPage } = usePagination(services, pageSize)

    // Set the search string to a Vue ref
    const searchQuery = ref('')

    // Extract the search string from the event, reset pagination and call the getServices method
    const searchHandler = (event: Event) => {
      const q = (event.target as HTMLInputElement).value
      currentPage.value = 1
      getServices(q)
    }

    // To reduce prop pollution in the template, using a computed property to pass
    // props and event handlers to the KPagination component
    const paginationParams = computed(() => ({
      props: {
        pageSize,
        currentPage: currentPage.value,
        totalCount: totalCount.value,
        totalPages: totalPages.value,
      },
      handlers: {
        next: nextPage,
        previous: previousPage,
      },
    }))

    return {
      loading,
      searchQuery,
      paginatedServices,
      paginationParams,
      searchHandler,
      nextPage,
      previousPage,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

input {
  padding: 8px 4px;
}
</style>
