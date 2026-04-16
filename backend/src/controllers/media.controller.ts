import type { Request, Response } from 'express'
import { createMedia } from '../services/media.service'

export const mediaController = {
  create(req: Request, res: Response): void {
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
  }
}
