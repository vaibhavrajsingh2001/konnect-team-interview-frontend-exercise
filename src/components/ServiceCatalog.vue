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
        <service-card
          v-for="(service, index) in paginatedServices"
          :key="service.id"
          :configured="service.configured"
          :description="service.description"
          :developers="getUniqueDeveloperList(service)"
          :metrics="service.metrics"
          :name="service.name"
          :published="service.published"
          :version-count="service.versions.length"
          @click="selectedServiceIndex = index"
        />
      </ul>

      <k-pagination
        v-if="paginationParams.props.totalPages > 1"
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
import ServiceCard from '@/components/ServiceCard.vue'

import useServices from '@/composables/useServices'
import usePagination from '@/composables/usePagination'
import type { Developer, Service } from '@/types'

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    KPagination,
    ServiceDetailModal,
    ServiceCard,
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

    const getUniqueDeveloperList = (service: Service): Array<Developer> => {
      // Maintain a map of developer ID to developer object to only add unique developers
      const developerMap: Record<string, Developer> = {}

      for (const { developer } of service.versions) {
        if (developer) {
          developerMap[developer.id] = developer
        }
      }

      return Object.values(developerMap)
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
      getUniqueDeveloperList,
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
}

.page-header {
  align-items: start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  .action-bar {
    column-gap: 2.4rem;
    display: flex;
    height: 4.4rem;

    .search-input {

      border: 1px solid #E7E7EC;
      border-radius: 0.4rem;
      gap: 8px;
      padding: 1rem 1.6rem;
      padding-left: 0.8rem;
      width: 21rem;
    }

    button.create-service {
      background: #07A88D;
      border: none;
      border-radius: 10rem;
      color: #FFFFFF;
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 2rem;
      padding: 1.2rem 2.4rem;
      padding-left: 1.6rem;
      text-align: center;
      width: 20rem;
    }
  }

  .page-title {
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
  gap: 4rem;
  list-style: none;
  margin-top: 2.4rem;
  padding: 0;
}
</style>
