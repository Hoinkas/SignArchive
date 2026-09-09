import type { Request, Response } from 'express'
import path from 'path'
import { createMedia, updateMedia } from '../services/media.service'
import { THUMBNAILS_URL, VIDEOS_URL } from '../config'
import 'fluent-ffmpeg'
import { generateThumbnail } from '../utils/helpers.functions'

export const mediaController = {
  async create(req: Request, res: Response): Promise<void> {
    const files = req.files as {
      videoFile?: Express.Multer.File[]
      thumbnailFile?: Express.Multer.File[]
    }

    const videoFile = files?.videoFile?.[0]

    if (!videoFile) {
      res.status(400).json({ error: 'Missing video file' })
      return
    }

    let thumbnailFilename = files?.thumbnailFile?.[0]?.filename

    if (!thumbnailFilename) {
      try {
        await generateThumbnail(videoFile.filename)
      } catch (error) {
        res.status(500).json({ error: 'Failed to generate thumbnail' })
        return
      }

      thumbnailFilename = `${path.parse(videoFile.filename).name}.jpg`
    }

    const result = createMedia({
      videoUrl: `${VIDEOS_URL}/${videoFile.filename}`,
      thumbnailUrl: `${THUMBNAILS_URL}/${thumbnailFilename}`,
      mediaType: videoFile.mimetype,
      description: req.body.description ?? undefined
    })

    res.status(201).json(result)
  },

  update(req: Request, res: Response): void {
    const files = req.files as {
      videoFile?: Express.Multer.File[]
      thumbnailFile?: Express.Multer.File[]
    }
    const videoFile = files?.videoFile?.[0]
    const thumbnailFile = files?.thumbnailFile?.[0]

    const data: Parameters<typeof updateMedia>[1] = {
      ...req.body,
      ...(videoFile && {
        videoUrl: `${VIDEOS_URL}/${videoFile.filename}`,
        mediaType: videoFile.mimetype
      }),
      ...(thumbnailFile && { thumbnailUrl: `${THUMBNAILS_URL}/${thumbnailFile.filename}` })
    }

    updateMedia(req.params.mediaId, data)
    res.status(204).send()
  }
}
