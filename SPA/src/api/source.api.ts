import { api } from './client'
import type { SourceDetails, SourceWithDetailsToCreate, SourceWithDetailsToDB } from '@shared/types'

export const sourceApi = {
  list: (signId: string, wordId: string): Promise<SourceDetails[]> =>
    api.get(`/signs/${signId}/words/${wordId}/sources`).then((r) => r.data),

  details: (sourceId: string): Promise<SourceDetails> =>
    api.get(`/sources/${sourceId}`).then((r) => r.data),

  regions: (): Promise<string[]> =>
    api.get('/sources/regions').then((r) => r.data),

  create: (data: SourceWithDetailsToCreate): Promise<SourceDetails> =>
    api.post('/sources', data).then((r) => r.data),

  update: (sourceId: string, data: Partial<SourceWithDetailsToDB>): Promise<SourceDetails> =>
    api.patch(`/sources/${sourceId}`, data).then((r) => r.data),

  delete: (sourceId: string): Promise<void> =>
    api.delete(`/sources/${sourceId}`).then(() => undefined)
}
