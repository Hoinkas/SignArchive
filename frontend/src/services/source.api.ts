import { apiPost, apiPatch, apiDelete } from './client'
import type { ISourceDetails, ISourceWithDetailsToDB } from '@src/models/source.model'

export const sourceApi = {
  create: (meaningId: string, data: ISourceWithDetailsToDB): Promise<ISourceDetails> =>
    apiPost<ISourceWithDetailsToDB, ISourceDetails>(`/meanings/${meaningId}/sources`, data).then(
      (r) => r.data
    ),

  update: (sourceId: string, data: Partial<ISourceWithDetailsToDB>): Promise<ISourceDetails> =>
    apiPatch<Partial<ISourceWithDetailsToDB>, ISourceDetails>(`/sources/${sourceId}`, data).then(
      (r) => r.data
    ),

  delete: (sourceId: string): Promise<void> =>
    apiDelete(`/sources/${sourceId}`).then(() => undefined)
}
