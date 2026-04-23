import { Router } from 'express'
import { mediaController } from '../controllers/media.controller'
import { upload } from '../middlewares/upload.middleware'

export const mediaRouter = Router()

mediaRouter.post(
  '/',
  upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'thumbnailFile', maxCount: 1 }
  ]),
  mediaController.create
)

mediaRouter.patch(
  '/:mediaId',
  upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'thumbnailFile', maxCount: 1 }
  ]),
  mediaController.update
)
