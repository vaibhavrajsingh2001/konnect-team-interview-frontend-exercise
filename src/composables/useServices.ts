import { ref, onBeforeMount } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import type { NetworkError, Service } from '@/types'

export default function useServices() {
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<NetworkError | null>(null)

  const getServices = async (q?: string): Promise<void> => {
    loading.value = true

    try {
      const response: AxiosResponse<Service[]> = await axios.get('/api/services', { params: { q } })

      services.value = response.data
      // Reset error
      error.value = null
    } catch (err: any) {
      // Check if error is an Axios error
      if (axios.isAxiosError(err)) {
        const { message, code, response } = err
        error.value = {
          message,
          code,
          status: response?.status,
        }
      } else {
        // Handle unknown errors
        error.value = {
          message: 'An unknown error occurred',
        }
      }
    } finally {
      loading.value = false
    }
  }

  onBeforeMount(getServices)

  return {
    services,
    loading,
    error,
    getServices,
  }
}
