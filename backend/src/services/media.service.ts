import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IMedia, IMediaAttached } from '../../../shared/models/media.model'
import fs from 'fs'
import path from 'path'
import { UPLOADS_DIR } from '../config'
import { fillMissingValues } from '../utils/helpers.functions'
import { mediaTemplate } from '../models/media.model'

// FIND
export function findMediaById(id: string): IMediaAttached | undefined {
  return getDb().prepare('SELECT * FROM media WHERE id = ?').get(id) as IMediaAttached | undefined
}

export function findMediaBySignId(signId: string): IMediaAttached | undefined {
  return getDb()
    .prepare(
      `
    SELECT * FROM media
    INNER JOIN sign ON sign.mediaId = media.id
    WHERE sign.id = ?
    `
    )
    .get(signId) as IMediaAttached | undefined
}

export function findMediaByVideoUrl(videoUrl: string): IMediaAttached | undefined {
  return getDb().prepare('SELECT * FROM media WHERE videoUrl = ?').get(videoUrl) as
    | IMediaAttached
    | undefined
}

// CREATE
export function createMedia(data: IMedia): IMediaAttached {
  const media: IMediaAttached = { id: nanoid(), createdAt: Date.now(), ...data }
  getDb()
    .prepare(
      `INSERT INTO media (id, createdAt, description, videoUrl, thumbnailUrl, mediaType)
      VALUES (@id, @createdAt, @description, @videoUrl, @thumbnailUrl, @mediaType)`
    )
    .run(fillMissingValues<IMedia>(media, mediaTemplate))
  return media
}

// UPDATE
export function updateMedia(mediaId: string, data: Partial<IMedia>): void {
  getDb()
    .prepare(
      'UPDATE media SET description = @description, videoUrl = @videoUrl, thumbnailUrl = @thumbnailUrl, mediaType = @mediaType WHERE id = @id'
    )
    .run({ id: mediaId, ...data })
}

// DELETE
import { VIDEOS_DIR, THUMBNAILS_DIR } from '../config'

export function deleteMedia(mediaId: string): void {
  const media = findMediaById(mediaId)
  if (!media) return

  getDb().prepare('DELETE FROM media WHERE id = ?').run(mediaId)

  const deleteFile = (url: string | undefined, dir: string): void => {
    if (!url) return
    const filePath = path.resolve(dir, path.basename(url))
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }

  deleteFile(media.videoUrl, VIDEOS_DIR)
  deleteFile(media.thumbnailUrl, THUMBNAILS_DIR)
}
