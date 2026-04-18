import type { ISignSimple } from '@src/models/sign.model'
import { apiGet } from './client'
// import { apiGet, apiPost, apiPatch, apiDelete } from './client'

export const signApi = {
  list: (): Promise<ISignSimple[]> => apiGet<ISignSimple[]>(`/signs`).then((r) => r.data)
}
