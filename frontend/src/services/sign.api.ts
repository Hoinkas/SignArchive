import type { ISignDetails, ISignDetailsEdit, ISignDetailsToDB } from '@src/models/sign.model'
import { api } from './client'
import type { IYearsRegions } from '@src/models/yearStartEnd.model'

export const signApi = {
  list: (wordId: string): Promise<ISignDetails[]> =>
    api.get(`/words/${wordId}/signs`).then((r) => r.data),

  create: (data: ISignDetailsToDB): Promise<ISignDetails> =>
    api.post('/signs', data).then((r) => r.data),

  update: (signId: string, data: Partial<ISignDetailsEdit>): Promise<ISignDetails> =>
    api.patch(`/signs/${signId}`, data).then((r) => r.data),

  delete: (signId: string): Promise<void> => api.delete(`/signs/${signId}`).then(() => undefined),

  yearsRegions: (signId: string, wordId: string): Promise<IYearsRegions> =>
    api.get(`/signs/${signId}/words/${wordId}/years-regions`).then((r) => r.data)
}
