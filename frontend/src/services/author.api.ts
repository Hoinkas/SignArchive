import type { IAuthorAttached } from '@src/models/author.model'
import { api } from './client'

export const authorApi = {
  list: (): Promise<IAuthorAttached[]> => api.get('/authors').then((r) => r.data)
}
