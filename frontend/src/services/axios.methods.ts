import axios, { type AxiosResponse } from 'axios'

export const adalApiGet = async <T>(
  url: string,
  axiosSettings?: Record<string, unknown>
): Promise<AxiosResponse<T>> => {
  return axios.get<T>(url, axiosSettings)
}

export const adalApiPut = async <T, K>(url: string, payload: T): Promise<AxiosResponse<K>> => {
  return axios.put<K>(url, payload)
}

export const adalApiPost = async <T, K>(url: string, payload: T): Promise<AxiosResponse<K>> => {
  return axios.post<K>(url, payload)
}

export const adalApiDelete = async <T>(url: string): Promise<AxiosResponse<T>> => {
  return axios.delete<T>(url)
}
