import { ref, computed, type Ref } from 'vue'
import type { Service } from '@/types'

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
    paginatedServices,
    nextPage,
    previousPage,
  }
}
