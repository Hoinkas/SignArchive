import { getDb } from '../db/client'
import { IMediaAttached } from '../models/media.model'

// FIND
export function findMediaBySignId(signId: string): IMediaAttached[] {
  const videos = getDb()
    .prepare('SELECT * FROM media WHERE signId = ?')
    .all(signId) as IMediaAttached[]

  if (videos.length <= 0) throw new Error('Nagranie znaku nie znalezione.');
  //Obsługa braku videoUrl

  return videos
}