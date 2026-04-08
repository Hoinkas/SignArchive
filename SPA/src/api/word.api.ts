import { api } from './client'
import type { Word, WordToDB, WordWithCountCategories } from '@shared/types'

export const wordApi = {
  list: (): Promise<WordWithCountCategories[]> =>
    api.get('/words').then((r) => r.data),

  details: (wordId: string): Promise<Word> =>
    api.get(`/words/${wordId}`).then((r) => r.data),

  create: (data: WordToDB): Promise<Word> =>
    api.post('/words', data).then((r) => r.data),

  update: (wordId: string, data: Partial<WordToDB>): Promise<Word> =>
    api.patch(`/words/${wordId}`, data).then((r) => r.data),

  delete: (wordId: string): Promise<void> =>
    api.delete(`/words/${wordId}`).then(() => undefined)
}
