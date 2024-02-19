import { ref, computed, onMounted, type Ref } from 'vue'
import useQueryParams from '@/composables/useQueryParams'
import { QueryParams, type Service } from '@/types'

/**
 * Using the offset and limit way to paginate the services.
 *
 * Limit is the number of services to be displayed, which is the pageSize.
 * Offset is the starting index of the services to be displayed, which is calculated by (currentPage - 1) * pageSize.
 */
export default function usePagination(services: Ref<Service[]>, pageSize = 10) {
  const { updateQueryParams, getQueryParam } = useQueryParams()

  const currentPage = ref(1)
  const totalCount = computed(() => services.value.length)
  const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

  // Slice the services array to get the paginated services using the offset and limit method.
  // The start index is offset and end index is limit.
  // startIndex => The current page is 1-indexed, so we need to subtract 1 from it to get the 0-indexed start index.
  // end index => end index is the index of last item on the page, which is start index + page size.
  const paginatedServices = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return services.value.slice(startIndex, endIndex)
  })

  // Increment the current page by 1 and update the query params
  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      updateQueryParams({ [QueryParams.Page]: currentPage.value.toString() })
    }
  }

  // Decrement the current page by 1 and update the query params
  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--
      updateQueryParams({ [QueryParams.Page]: currentPage.value.toString() })
    }
  }

  // Set inital value of currentPage from the query parameter
  onMounted(() => {
    const initialPage = getQueryParam(QueryParams.Page)

    // If the page query parameter is present, and is a +ve integer
    // set the currentPage to the value of the page query parameter.
    // Else, set the currentPage to default value of 1.
    if (initialPage && typeof initialPage === 'string') {
      const initialPageNumber = Number(initialPage)
      currentPage.value =
        Number.isInteger(initialPageNumber) && initialPageNumber > 0 ? initialPageNumber : 1
    }
  })

  return {
    currentPage,
    totalPages,
    totalCount,
    paginatedServices,
    nextPage,
    previousPage,
  }
}
