<template>
  <div class="service-catalog">
    <div class="page-header">
      <div class="page-title">
        <h1>Service Hub</h1>
        <h2>Organize services, manage and track versioning and API service documentation.</h2>
      </div>
      <div class="action-bar">
        <input
          id="search-input"
          v-debounce:350="searchHandler"
          data-testid="search-input"
          placeholder="Search"
          :value="searchQuery"
        >

        <button
          class="create-service"
          @click="handleCreateServiceClick"
        >
          + Service Package
        </button>
      </div>
    </div>

    <ul
      v-if="loading"
      class="catalog"
    >
      <li
        v-for="ii in pageSize"
        :key="ii"
        class="service-card-skeleton-loader"
      />
    </ul>

    <div
      v-else-if="errorCopytext"
      class="empty-state"
    >
      {{ errorCopytext }}
    </div>

    <template v-else-if="paginatedServices.length">
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
          @click="serviceCardClickHandler(index)"
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
      class="empty-state"
      data-testid="no-results"
    >
      {{ searchQuery ? `No results found for '${searchQuery}'` : 'No services created yet.' }}
    </div>

    <Teleport to="#k-modal-root">
      <service-detail-modal
        v-if="selectedServiceData"
        :description="selectedServiceData.description"
        :title="selectedServiceData.name"
        :type="selectedServiceData.type"
        :versions="selectedServiceData.versions"
        @close="serviceCardClickHandler(-1)"
      />
    </Teleport>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

import KPagination from '@/components/common/KPagination.vue'
import ServiceDetailModal from '@/components/service/ServiceDetailModal.vue'
import ServiceCard from '@/components/service/ServiceCard.vue'

import useServices from '@/composables/useServices'
import usePagination from '@/composables/usePagination'
import useQueryParams from '@/composables/useQueryParams'

import { QueryParams, type Developer, type Service } from '@/types'

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
    // Set the search string to a Vue ref
    const searchQuery = ref('')
    // The index of the selected service on the current page
    const selectedServiceIndex = ref(-1)

    // Import required values and methods from the composables
    const { getQueryParam, updateQueryParams, removeQueryParams } = useQueryParams()
    const { services, loading, error, getServices } = useServices()
    const { currentPage, totalPages, totalCount, paginatedServices, nextPage, previousPage } = usePagination(
      services,
      pageSize,
    )

    // ———— Mounted hook ————

    // On component mount, get the initial search query and selected service index from the query params
    onMounted(() => {
      const initialSearchQuery = getQueryParam(QueryParams.Search)
      const intialSelectedServiceIndex = getQueryParam(QueryParams.SelectedService)

      // If the search query parameter is present, set the searchQuery to the value of the search query parameter.
      if (initialSearchQuery && typeof initialSearchQuery === 'string') {
        searchQuery.value = initialSearchQuery
      }

      // If the selected service query param is present, set the selectedServiceIndex to the value of the selected service param.
      if (intialSelectedServiceIndex && typeof intialSelectedServiceIndex === 'string') {
        const initialSelectedServiceIndex = Number(intialSelectedServiceIndex)
        selectedServiceIndex.value =
          Number.isInteger(initialSelectedServiceIndex) && initialSelectedServiceIndex >= 0
            ? initialSelectedServiceIndex
            : -1
      }

      // fetch services with the initial search query
      getServices(searchQuery.value)

    })

    // ———— Methods ————

    // Extract the search string from the event, reset pagination and call the getServices method
    const searchHandler = (q: string) => {
      currentPage.value = 1
      searchQuery.value = q

      // If the search query is present, update the query params with the search query
      // and reser page number to 1
      if (q) {
        updateQueryParams({ [QueryParams.Search]: q, [QueryParams.Page]: '1' })
      } else {
        // If the search query is empty, remove the search query param and page number from query params
        removeQueryParams([QueryParams.Search])
      }

      getServices(q)
    }

    const serviceCardClickHandler = (index: number) => {
      if (index >= 0) {
        updateQueryParams({ [QueryParams.SelectedService]: index.toString() })
      } else {
        removeQueryParams([QueryParams.SelectedService])
      }

      selectedServiceIndex.value = index
    }

    const handleCreateServiceClick = () => {
      alert('Create service clicked')
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

    // ———— Computed properties ————

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
      // If the selected service index is out of bounds, return null
      // P.S.: number of items shown might be less than pageSize, hence used total services count for max check instead of pageSize
      if (selectedServiceIndex.value < 0 || selectedServiceIndex.value >= paginatedServices.value.length) {
        return null
      }

      return paginatedServices.value[selectedServiceIndex.value]
    })

    const serviceDetailModalParams = computed(() => ({
      description: selectedServiceData.value?.description,
      title: selectedServiceData.value?.name,
      versions: selectedServiceData.value?.versions,
      type: selectedServiceData.value?.type,
    }))

    const errorCopytext = computed(() => {
      if (error.value?.code === '404' && searchQuery.value) {
        return `No results found for '${searchQuery.value}'`
      } else if (error.value?.message) {
        return `An error occurred while fetching services: ${error.value.message}`
      }
      return ''
    })

    return {
      loading,
      errorCopytext,
      pageSize,
      searchQuery,
      paginatedServices,
      paginationParams,
      serviceDetailModalParams,
      selectedServiceIndex,
      selectedServiceData,
      searchHandler,
      serviceCardClickHandler,
      getUniqueDeveloperList,
      handleCreateServiceClick,
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
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    margin-bottom: 4rem;
  }

  .action-bar {
    column-gap: 2.4rem;
    display: flex;
    height: 4.4rem;

    #search-input {
      border: 1px solid #e7e7ec;
      border-radius: 0.4rem;
      gap: 8px;
      padding: 1rem 1.6rem;
      padding-left: 0.8rem;
      width: 21rem;
    }

    button.create-service {
      background: #07a88d;
      border: none;
      border-radius: 10rem;
      color: #ffffff;
      cursor: pointer;
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 2rem;
      padding: 1.2rem 2.4rem;
      padding-left: 1.6rem;
      text-align: center;
      width: 20rem;

      @media screen and (max-width: 960px) {
        display: none;
      }
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

  .service-card-skeleton-loader {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background: gainsboro;
    border-radius: 0.2rem;
    height: 24rem;
    width: 42rem;

    @keyframes pulse {
      50% {
        opacity: .5;
      }
    }
  }
}

.empty-state {
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  margin-top: 25rem;
  text-align: center;
}
</style>
