import { Request } from 'express'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { VIDEOS_DIR, THUMBNAILS_DIR } from '../config'

export const param = (req: Request, key: string): string => req.params[key] as string

export function fillMissingValues<T>(obj: Partial<T>, template: Record<keyof T, null>): T {
  const result = { ...obj } as T

  for (const key in template) {
    if ((obj as any)[key] === undefined) {
      ;(obj as any)[key] = null
    }
  }
  return result
}

export function generateThumbnail(videoName: string): Promise<void> {
  const videoPath = path.join(VIDEOS_DIR, videoName)
  const thumbnailFilename = `${path.parse(videoName).name}.jpg`

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('end', () => resolve())
      .on('error', (err: any) => reject(err instanceof Error ? err : new Error(String(err))))
      .screenshots({
        count: 1,
        timemarks: ['00:00:01.000'],
        filename: thumbnailFilename,
        folder: THUMBNAILS_DIR,
        size: '480x640'
      })
  })
}
