import { useRouter, type LocationQuery } from 'vue-router'

export default function useQueryParams() {

  const { push, currentRoute: { value: { query } } } = useRouter()

  function getQueryParam(key: string) {
    return query[key]
  }

  async function updateQueryParams(newParams: LocationQuery) {
    console.log('newParams', newParams)
    console.log('before updating', { query })
    await push({
      query: {
        ...query,
        ...newParams,
      },
    })
    console.log('after updating', { query })
  }

  return {
    updateQueryParams,
    getQueryParam,
  }
}
