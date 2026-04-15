import axios, { type AxiosResponse } from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const apiGet = <T>(
  url: string,
  settings?: Record<string, unknown>
): Promise<AxiosResponse<T>> => axios.get<T>(BASE_URL + url, settings)

export const apiPost = <T, K>(url: string, payload: T): Promise<AxiosResponse<K>> =>
  axios.post<K>(BASE_URL + url, payload)

export const apiPatch = <T, K>(url: string, payload: T): Promise<AxiosResponse<K>> =>
  axios.patch<K>(BASE_URL + url, payload)

export const apiDelete = <T>(url: string): Promise<AxiosResponse<T>> =>
  axios.delete<T>(BASE_URL + url)
