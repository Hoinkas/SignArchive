import type {
  IWordCategoriesAttached,
  IWordToDB,
  IWordWithRegionsCategories
} from '@src/models/word.model'
import { api } from './client'

export const wordApi = {
  list: (): Promise<IWordWithRegionsCategories[]> => api.get('/words').then((r) => r.data),

  details: (wordId: string): Promise<IWordCategoriesAttached> =>
    api.get(`/words/${wordId}`).then((r) => r.data),

  create: (data: IWordToDB): Promise<IWordCategoriesAttached> =>
    api.post('/words', data).then((r) => r.data),

  update: (wordId: string, data: Partial<IWordToDB>): Promise<IWordCategoriesAttached> =>
    api.patch(`/words/${wordId}`, data).then((r) => r.data),

  delete: (wordId: string): Promise<void> => api.delete(`/words/${wordId}`).then(() => undefined)
}
