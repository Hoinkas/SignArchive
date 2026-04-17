import type {
  IWordCategoriesAttached,
  IWordToDB,
  IWordWithRegionsCategories
} from '@src/models/word.model'
import { apiGet, apiPost, apiPatch, apiDelete } from './client'

export const wordApi = {
  list: (): Promise<IWordWithRegionsCategories[]> =>
    apiGet<IWordWithRegionsCategories[]>('/words').then((r) => r.data),

  findByName: (name: string): Promise<IWordWithRegionsCategories> =>
    apiGet<IWordWithRegionsCategories>(`/words/name/${name}`).then((r) => r.data),

  details: (wordId: string): Promise<IWordCategoriesAttached> =>
    apiGet<IWordCategoriesAttached>(`/words/${wordId}`).then((r) => r.data),

  create: (data: IWordToDB): Promise<IWordCategoriesAttached> =>
    apiPost<IWordToDB, IWordCategoriesAttached>('/words', data).then((r) => r.data),

  update: (wordId: string, data: Partial<IWordToDB>): Promise<IWordCategoriesAttached> =>
    apiPatch<Partial<IWordToDB>, IWordCategoriesAttached>(`/words/${wordId}`, data).then(
      (r) => r.data
    ),

  delete: (wordId: string): Promise<void> => apiDelete(`/words/${wordId}`).then(() => undefined)
}
