import type { ISignDetails, ISignDetailsEdit, ISignDetailsToDB } from '@src/models/sign.model'
import { apiGet, apiPost, apiPatch, apiDelete } from './client'
import type { IYearsRegions } from '@src/models/yearStartEnd.model'

export const signApi = {
  list: (wordId: string): Promise<ISignDetails[]> =>
    apiGet<ISignDetails[]>(`/words/${wordId}/signs`).then((r) => r.data),

  create: (data: ISignDetailsToDB): Promise<ISignDetails> =>
    apiPost<ISignDetailsToDB, ISignDetails>('/signs', data).then((r) => r.data),

  update: (signId: string, data: Partial<ISignDetailsEdit>): Promise<ISignDetails> =>
    apiPatch<Partial<ISignDetailsEdit>, ISignDetails>(`/signs/${signId}`, data).then((r) => r.data),

  delete: (signId: string): Promise<void> => apiDelete(`/signs/${signId}`).then(() => undefined),

  yearsRegions: (signId: string, wordId: string): Promise<IYearsRegions> =>
    apiGet<IYearsRegions>(`/signs/${signId}/words/${wordId}/years-regions`).then((r) => r.data)
}
