import type { IMediaAttached } from '@src/models/media.model'
import { apiPost } from './client'

export const mediaApi = {
  upload: (file: File, name?: string): Promise<IMediaAttached> => {
    const form = new FormData()
    form.append('file', file)
    if (name) form.append('name', name)
    return apiPost<FormData, IMediaAttached>('/media', form).then((r) => r.data)
  }
}
