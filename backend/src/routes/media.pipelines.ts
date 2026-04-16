import { Router } from 'express'
import { upload } from '../upload'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { createMedia } from '../services/media.service'

export const mediaRouter = Router()
mediaRouter.post(
  '/',
  requireAdmin,
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const file = req.file
    if (!file) {
      res.status(400).json({ error: 'Brak pliku' })
      return
    }

    const result = createMedia({
      url: `/uploads/${file.filename}`,
      mediaType: file.mimetype,
      name: req.body.name ?? file.originalname
    })

    res.status(201).json(result)
  })
)
