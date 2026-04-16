import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IMedia, IMediaAttached } from '../../../shared/models/media.model'
import fs from 'fs'
import path from 'path'
import { UPLOADS_DIR } from '../config'

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

export function deleteUnusedMedia(mediaId: string): void {
  const db = getDb()
  const inUse = db.prepare('SELECT id FROM sign WHERE mediaId = ?').get(mediaId)
  if (inUse) return

  const media = findMediaById(mediaId)
  if (!media) return

  db.prepare('DELETE FROM media WHERE id = ?').run(mediaId)

  if (media.url.startsWith('/uploads/')) {
    const filePath = path.resolve(UPLOADS_DIR, path.basename(media.url))
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }
}

export function deleteMedia(mediaId: string): void {
  const media = findMediaById(mediaId)
  if (!media) return

  getDb().prepare('DELETE FROM media WHERE id = ?').run(mediaId)

  if (media.url.startsWith('/uploads/')) {
    const filePath = path.resolve(UPLOADS_DIR, path.basename(media.url))
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }
}
