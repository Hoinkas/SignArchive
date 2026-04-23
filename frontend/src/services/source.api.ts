import { apiPost, apiPatch, apiDelete } from './client'
import type { ISource, ISourceAttached, ISourceDetails } from '@src/models/source.model'

export const sourceApi = {
  create: (meaningId: string, data: ISource): Promise<ISourceDetails> =>
    apiPost<ISource, ISourceDetails>(`/meanings/${meaningId}/sources`, data).then((r) => r.data),

  update: (sourceId: string, data: Partial<ISourceAttached>): Promise<ISourceDetails> =>
    apiPatch<Partial<ISourceAttached>, ISourceDetails>(`/sources/${sourceId}`, data).then(
      (r) => r.data
    ),

  delete: (sourceId: string): Promise<void> =>
    apiDelete(`/sources/${sourceId}`).then(() => undefined)
}
