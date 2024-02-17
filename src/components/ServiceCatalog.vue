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
          v-for="(service, index) in paginatedServices"
          :key="service.id"
          class="service"
          @click="selectedServiceIndex = index"
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

    <Teleport to="#k-modal-root">
      <service-detail-modal
        v-if="selectedServiceData"
        :description="selectedServiceData.description"
        :title="selectedServiceData.name"
        :type="selectedServiceData.type"
        :versions="selectedServiceData.versions"
        @close="selectedServiceIndex = -1"
      />
    </Teleport>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import KPagination from '@/components/KPagination.vue'
import ServiceDetailModal from '@/components/ServiceDetailModal.vue'

import useServices from '@/composables/useServices'
import usePagination from '@/composables/usePagination'

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    KPagination,
    ServiceDetailModal,
  },
  setup() {
    // Fixed page size
    const pageSize = 10

    // Import services from the composable
    const { services, loading, getServices } = useServices()

    const { currentPage, totalPages, totalCount, paginatedServices, nextPage, previousPage } = usePagination(services, pageSize)

    // Set the search string to a Vue ref
    const searchQuery = ref('')
    // The index of the selected service on the current page
    const selectedServiceIndex = ref(-1)

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

    // A computed property to get the selected service data
    // This service will be shown in a modal
    const selectedServiceData = computed(() => {
      // No. of items shown might be less than pageSize, hence use item count for max check instead of pageSize
      if (selectedServiceIndex.value < 0 || selectedServiceIndex.value >= paginatedServices.value.length) return null

      return paginatedServices.value[selectedServiceIndex.value]
    })

    const serviceDetailModalParams = computed(() => ({
      description: selectedServiceData.value?.description,
      title: selectedServiceData.value?.name,
      versions: selectedServiceData.value?.versions,
      type: selectedServiceData.value?.type,
    }))

    return {
      loading,
      searchQuery,
      paginatedServices,
      paginationParams,
      serviceDetailModalParams,
      selectedServiceIndex,
      selectedServiceData,
      searchHandler,
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
