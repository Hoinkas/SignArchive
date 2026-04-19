import { apiGet, apiPost, apiDelete } from './client'
import type { IWord, IWordAttached } from '@src/models/word.model'

export const wordApi = {
  list: (): Promise<IWordAttached[]> => apiGet<IWordAttached[]>(`/words`).then((r) => r.data),
  create: (meaningId: string, data: IWord): Promise<IWordAttached> =>
    apiPost<IWord, IWordAttached>(`meanings/${meaningId}/words`, data).then((r) => r.data),
  delete: (meaningId: string, wordId: string): Promise<void> =>
    apiDelete(`meanings/${meaningId}/words/${wordId}`).then(() => undefined)
}
