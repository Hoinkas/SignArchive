import type {
  ISourceDetails,
  ISourceWithDetailsToCreate,
  ISourceWithDetailsToDB
} from '@src/models/source.model'
import { apiGet, apiPost, apiPatch, apiDelete } from './client'

export const sourceApi = {
  list: (signId: string, wordId: string): Promise<ISourceDetails[]> =>
    apiGet<ISourceDetails[]>(`/signs/${signId}/words/${wordId}/sources`).then((r) => r.data),

  details: (sourceId: string): Promise<ISourceDetails> =>
    apiGet<ISourceDetails>(`/sources/${sourceId}`).then((r) => r.data),

  regions: (): Promise<string[]> => apiGet<string[]>('/sources/regions').then((r) => r.data),

  create: (data: ISourceWithDetailsToCreate): Promise<ISourceDetails> =>
    apiPost<ISourceWithDetailsToCreate, ISourceDetails>('/sources', data).then((r) => r.data),

  update: (sourceId: string, data: Partial<ISourceWithDetailsToDB>): Promise<ISourceDetails> =>
    apiPatch<Partial<ISourceWithDetailsToDB>, ISourceDetails>(`/sources/${sourceId}`, data).then(
      (r) => r.data
    ),

  delete: (sourceId: string): Promise<void> =>
    apiDelete(`/sources/${sourceId}`).then(() => undefined)
}
