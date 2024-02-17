import { ref, computed, type Ref } from 'vue'
import type { Service } from '@/types'

/**
 * Using the offset and limit way to paginate the services.
 *
 * Limit is the number of services to be displayed, which is the pageSize.
 * Offset is the starting index of the services to be displayed, which is calculated by (currentPage - 1) * pageSize.
 */
export default function usePagination(services: Ref<Service[]>, pageSize = 10) {

  const currentPage = ref(1)
  const totalCount = computed(() => services.value.length)
  const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

  const paginatedServices = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return services.value.slice(startIndex, endIndex)
  })

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    currentPage,
    totalPages,
    totalCount,
    paginatedServices,
    nextPage,
    previousPage,
  }
}
