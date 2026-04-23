import { apiPost, apiPatch } from './client'
import type { IMediaAttached, IMediaToDB } from '@src/models/media.model'

export const mediaApi = {
  create: (data: IMediaToDB): Promise<IMediaAttached> => {
    const formData = new FormData()
    formData.append('videoFile', data.videoFile)
    if (data.thumbnailFile) formData.append('thumbnailFile', data.thumbnailFile)
    if (data.description) formData.append('description', data.description)
    return apiPost<FormData, IMediaAttached>('/media', formData).then((r) => r.data)
  },
  update: (mediaId: string, data: Partial<IMediaToDB>): Promise<void> => {
    const formData = new FormData()
    if (data.videoFile) formData.append('videoFile', data.videoFile)
    if (data.thumbnailFile) formData.append('thumbnailFile', data.thumbnailFile)
    if (data.description) formData.append('description', data.description)
    return apiPatch<FormData>(`/media/${mediaId}`, formData).then(() => undefined)
  }
}
