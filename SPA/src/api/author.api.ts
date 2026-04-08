import { api } from './client'
import type { Author } from '@shared/types'

export const authorApi = {
  list: (): Promise<Author[]> =>
    api.get('/authors').then((r) => r.data)
}
