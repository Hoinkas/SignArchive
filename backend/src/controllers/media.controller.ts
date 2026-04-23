import type { Request, Response } from 'express'
import { createMedia, updateMedia } from '../services/media.service'
import { THUMBNAILS_URL, VIDEOS_URL } from '../config'

export const mediaController = {
  create(req: Request, res: Response): void {
    const files = req.files as {
      videoFile?: Express.Multer.File[]
      thumbnailFile?: Express.Multer.File[]
    }
    const videoFile = files?.videoFile?.[0]

    if (!videoFile) {
      res.status(400).json({ error: 'Missing video file' })
      return
    }

    const thumbnailFile = files?.thumbnailFile?.[0]

    const result = createMedia({
      videoUrl: `${VIDEOS_URL}/${videoFile.filename}`,
      thumbnailUrl: thumbnailFile ? `${THUMBNAILS_URL}/${thumbnailFile.filename}` : undefined,
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
