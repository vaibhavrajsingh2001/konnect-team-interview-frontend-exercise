import { ref, onBeforeMount } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import type { Service } from '@/types'

export default function useServices() {
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)

  const getServices = async (): Promise<void> => {
    try {
      loading.value = true

      const response: AxiosResponse<Service[]> = await axios.get('/api/services')

      services.value = response.data
    } catch (err: any) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  onBeforeMount(getServices)

  return {
    services,
    loading,
    error,
  }
}
