import type { ITag, ITagAttached } from '@src/models/tag.model'
import { api } from './client'

export const tagApi = {
  list: (): Promise<ITagAttached[]> => api.get('/tags').then((r) => r.data),

  listByWordId: (wordId: string): Promise<ITagAttached[]> =>
    api.get(`/words/${wordId}/tags`).then((r) => r.data),

  create: (wordId: string, data: ITag): Promise<ITagAttached> =>
    api.post(`/words/${wordId}/tags`, data).then((r) => r.data),

  addToWord: (wordId: string, tagId: string): Promise<void> =>
    api.put(`/words/${wordId}/tags/${tagId}`).then(() => undefined),

  removeFromWord: (tagId: string, wordId: string): Promise<void> =>
    api.delete(`/words/${wordId}/tags/${tagId}`).then(() => undefined),

  delete: (tagId: string): Promise<void> => api.delete(`/tags/${tagId}`).then(() => undefined)
}
