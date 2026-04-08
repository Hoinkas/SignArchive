import { api } from './client'
import type { SignDetails, SignDetailsToDB, SignToDB, YearsRegions } from '@shared/types'

export const signApi = {
  list: (wordId: string): Promise<SignDetails[]> =>
    api.get(`/words/${wordId}/signs`).then((r) => r.data),

  create: (data: SignDetailsToDB): Promise<SignDetails> =>
    api.post('/signs', data).then((r) => r.data),

  update: (signId: string, data: Partial<SignToDB>): Promise<SignDetails> =>
    api.patch(`/signs/${signId}`, data).then((r) => r.data),

  delete: (signId: string): Promise<void> =>
    api.delete(`/signs/${signId}`).then(() => undefined),

  yearsRegions: (signId: string, wordId: string): Promise<YearsRegions> =>
    api.get(`/signs/${signId}/words/${wordId}/years-regions`).then((r) => r.data)
}
