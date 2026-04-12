import type { ITag, ITagAttached } from '@src/models/tag.model'
import { apiGet, apiPost, apiDelete } from './client'

export const tagApi = {
  list: (): Promise<ITagAttached[]> => apiGet<ITagAttached[]>('/tags').then((r) => r.data),

  listByWordId: (wordId: string): Promise<ITagAttached[]> =>
    apiGet<ITagAttached[]>(`/words/${wordId}/tags`).then((r) => r.data),

  create: (wordId: string, data: ITag): Promise<ITagAttached> =>
    apiPost<ITag, ITagAttached>(`/words/${wordId}/tags`, data).then((r) => r.data),

  delete: (tagId: string): Promise<void> => apiDelete(`/tags/${tagId}`).then(() => undefined)
}
