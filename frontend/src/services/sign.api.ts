import type { ISignDetailed, ISignSimple } from '@src/models/sign.model'
import { apiGet } from './client'

export const signApi = {
  list: (): Promise<ISignSimple[]> => apiGet<ISignSimple[]>(`/signs`).then((r) => r.data),
  details: (signId: string): Promise<ISignDetailed> => apiGet<ISignDetailed>(`/signs/${signId}`).then((r) => r.data),
}
