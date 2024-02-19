import { useRouter, useRoute, type LocationQuery } from 'vue-router'

export default function useQueryParams() {
  const router = useRouter()
  const route = useRoute()

  function getQueryParam(key: string) {
    return route.query[key]
  }

  async function updateQueryParams(newParams: LocationQuery) {
    await router.replace({
      query: {
        ...route.query,
        ...newParams,
      },
    })
  }

  async function removeQueryParams(keys: string[]) {
    const newQuery = { ...route.query }
    keys.forEach((key) => {
      delete newQuery[key]
    })

    await router.replace({
      query: newQuery,
    })
  }

  return {
    updateQueryParams,
    getQueryParam,
    removeQueryParams,
  }
}
