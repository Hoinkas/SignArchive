import type { IMeaningAttached, IMeaningDetails, IMeaningToDB } from '@src/models/meaning.model'
import { apiDelete, apiPatch, apiPost } from './client'

export const meaningApi = {
  create: (signId: string, data: IMeaningToDB): Promise<IMeaningDetails> =>
    apiPost<IMeaningToDB, IMeaningDetails>(`/signs/${signId}/meanings/`, data).then((r) => r.data),

  update: (meaningId: string, data: Partial<IMeaningAttached>): Promise<void> =>
    apiPatch<Partial<IMeaningAttached>>(`/meanings/${meaningId}`, data).then((r) => r.data),

  delete: (meaningId: string): Promise<void> =>
    apiDelete(`/meanings/${meaningId}`).then(() => undefined)
}
