import type { IWord, IWordAttached, IWordWithCountCategories } from '@src/models/word.model'
import { api } from './client'

export const wordApi = {
  list: (): Promise<IWordWithCountCategories[]> => api.get('/words').then((r) => r.data),

  details: (wordId: string): Promise<IWordAttached> =>
    api.get(`/words/${wordId}`).then((r) => r.data),

  create: (data: IWord): Promise<IWordAttached> => api.post('/words', data).then((r) => r.data),

  update: (wordId: string, data: Partial<IWord>): Promise<IWordAttached> =>
    api.patch(`/words/${wordId}`, data).then((r) => r.data),

  delete: (wordId: string): Promise<void> => api.delete(`/words/${wordId}`).then(() => undefined)
}
