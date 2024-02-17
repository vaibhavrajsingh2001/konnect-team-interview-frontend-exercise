<template>
  <div class="service-catalog">
    <div class="page-header">
      <div class="page-title">
        <h1>Service Hub</h1>
        <h2>Organize services, manage and track versioning and API service documentation.</h2>
      </div>
      <div class="action-bar">
        <input
          v-model="searchQuery"
          v-debounce:350="searchHandler"
          class="search-input"
          data-testid="search-input"
          placeholder="Search"
        >

        <button class="create-service">
          + Service Package
        </button>
      </div>
    </div>

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
    const searchHandler = (q: string) => {
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
  // Center the content via margin auto on x-axis
  margin: 4rem auto;
  // Add padding to the sides
  padding: 0 4rem;
  max-width: 128rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;

  .action-bar {
    height: 4.4rem;
    display: flex;
    column-gap: 2.4rem;

    .search-input {
      width: 21rem;
      padding: 1rem 1.6rem;
      padding-left: 0.8rem;
      border-radius: 0.4rem;
      gap: 8px;

      border: 1px solid #E7E7EC;
    }

    button.create-service {
      width: 20rem;
      padding: 1.2rem 2.4rem;
      padding-left: 1.6rem;
      border: none;
      border-radius: 10rem;
      gap: 0.8rem;
      background: #07A88D;
      color: #FFFFFF;
      font-family: Inter;
      font-weight: 600;
      line-height: 2rem;
      letter-spacing: 0px;
      text-align: center;
    }
  }

  .page-title {
    color: #3C4557;
    letter-spacing: 0px;
    text-align: left;

    h1 {
      font-size: 3.2rem;
      font-weight: 700;
      line-height: 3.6rem;
      margin: 0;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.4rem;
      margin: 1.6rem 0 0 0;
    }
  }

}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;
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
</style>
