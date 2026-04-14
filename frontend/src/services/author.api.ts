import type { IAuthorAttached } from '@src/models/author.model'
import { apiGet } from './client'

export const authorApi = {
  list: (): Promise<IAuthorAttached[]> => apiGet<IAuthorAttached[]>('/authors').then((r) => r.data)
}
