import { useState } from 'react'
import type { AxiosResponse } from 'axios'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const execute = async (request: Promise<AxiosResponse<T>>): Promise<T | null> => {
    setState({ data: null, loading: true, error: null })
    try {
      const response = await request
      setState({ data: response.data, loading: false, error: null })
      return response.data
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Nieznany błąd'
      setState({ data: null, loading: false, error: message })
      return null
    }
  }

  return { ...state, execute }
}
