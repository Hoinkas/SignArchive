import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IMediaFile, IMediaFileAttached } from '../../../shared/models/mediaFile.model'

export function findMediaFileById(id: string): IMediaFileAttached | undefined {
  return getDb().prepare('SELECT * FROM mediaFile WHERE id = ?').get(id) as
    | IMediaFileAttached
    | undefined
}

export function createMediaFile(data: IMediaFile): IMediaFileAttached {
  const file: IMediaFileAttached = { id: nanoid(), createdAt: Date.now(), fileUrl: data.fileUrl }
  getDb()
    .prepare('INSERT INTO mediaFile (id, createdAt, fileUrl) VALUES (@id, @createdAt, @fileUrl)')
    .run(file)
  return file
}
