import type { ISignDetails, ISignDetailsToDB, ISignSimple } from '@src/models/sign.model'
import { apiGet, apiPost, apiPatch, apiDelete } from './client'

export const signApi = {
  list: (): Promise<ISignSimple[]> => apiGet<ISignSimple[]>(`/signs`).then((r) => r.data),
  details: (signId: string): Promise<ISignDetails> =>
    apiGet<ISignDetails>(`/signs/${signId}`).then((r) => r.data),
  create: (data: ISignDetailsToDB): Promise<ISignSimple> =>
    apiPost<ISignDetailsToDB, ISignSimple>('/signs', data).then((r) => r.data),
  update: (signId: string, data: Partial<ISignDetails>): Promise<void> =>
    apiPatch<Partial<ISignDetails>>(`/signs/${signId}`, data).then(() => undefined),
  delete: (signId: string): Promise<void> => apiDelete(`/signs/${signId}`).then(() => undefined)
}
