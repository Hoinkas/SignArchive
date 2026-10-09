import { apiGet } from './client'
import type { IWordAttached } from '@src/models/word.model'

export const wordApi = {
  list: (): Promise<IWordAttached[]> => apiGet<IWordAttached[]>(`/words`).then((r) => r.data),
}
