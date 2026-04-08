import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IMedia, IMediaAttached } from '../../../shared/models/media.model'

export function findMediaById(id: string): IMediaAttached | undefined {
  return getDb().prepare('SELECT * FROM media WHERE id = ?').get(id) as IMediaAttached | undefined
}

export function findMediaBySignId(signId: string): IMediaAttached | undefined {
  return getDb()
    .prepare(
      `
    SELECT * FROM media
    INNER JOIN sign ON sign.mediaId = media.id
    WHERE media.id = ?
    `
    )
    .get(signId) as IMediaAttached | undefined
}

export function createMedia(data: IMedia): IMediaAttached {
  const file: IMediaAttached = { id: nanoid(), createdAt: Date.now(), ...data }
  getDb()
    .prepare(
      'INSERT INTO media (id, createdAt, url, name, mediaType) VALUES (@id, @createdAt, @url, @name, @mediaType)'
    )
    .run(file)
  return file
}

export function updateMedia(mediaId: string, data: Partial<IMedia>): IMediaAttached | undefined {
  const existing = findMediaById(mediaId)
  if (!existing) return undefined

  const updated: IMediaAttached = { ...existing, ...data, id: mediaId }
  getDb()
    .prepare('UPDATE media SET url = @url, name = @name, mediaType = @mediaType WHERE id = @id')
    .run(updated)
  return updated
}
