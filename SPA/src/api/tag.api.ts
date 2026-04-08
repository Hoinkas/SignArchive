import { api } from './client'
import type { Tag, TagToDB } from '@shared/types'

export const tagApi = {
  list: (): Promise<Tag[]> =>
    api.get('/tags').then((r) => r.data),

  listByWordId: (wordId: string): Promise<Tag[]> =>
    api.get(`/words/${wordId}/tags`).then((r) => r.data),

  create: (wordId: string, data: TagToDB): Promise<Tag> =>
    api.post(`/words/${wordId}/tags`, data).then((r) => r.data),

  addToWord: (wordId: string, tagId: string): Promise<void> =>
    api.put(`/words/${wordId}/tags/${tagId}`).then(() => undefined),

  removeFromWord: (tagId: string, wordId: string): Promise<void> =>
    api.delete(`/words/${wordId}/tags/${tagId}`).then(() => undefined),

  delete: (tagId: string): Promise<void> =>
    api.delete(`/tags/${tagId}`).then(() => undefined)
}
