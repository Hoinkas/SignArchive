import type {
  ISourceDetails,
  ISourceWithDetailsToCreate,
  ISourceWithDetailsToDB
} from '@src/models/source.model'
import { api } from './client'

export const sourceApi = {
  list: (signId: string, wordId: string): Promise<ISourceDetails[]> =>
    api.get(`/signs/${signId}/words/${wordId}/sources`).then((r) => r.data),

  details: (sourceId: string): Promise<ISourceDetails> =>
    api.get(`/sources/${sourceId}`).then((r) => r.data),

  regions: (): Promise<string[]> => api.get('/sources/regions').then((r) => r.data),

  create: (data: ISourceWithDetailsToCreate): Promise<ISourceDetails> =>
    api.post('/sources', data).then((r) => r.data),

  update: (sourceId: string, data: Partial<ISourceWithDetailsToDB>): Promise<ISourceDetails> =>
    api.patch(`/sources/${sourceId}`, data).then((r) => r.data),

  delete: (sourceId: string): Promise<void> =>
    api.delete(`/sources/${sourceId}`).then(() => undefined)
}
