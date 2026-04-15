import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { tagController } from '../controllers/tag.controller'

export const tagRouter = Router()
tagRouter.get('/', asyncHandler(tagController.list))
tagRouter.delete('/:tagId', requireAdmin, asyncHandler(tagController.delete))

export const tagWordRouter = Router({ mergeParams: true })
tagWordRouter
  .route('/:wordId/tags')
  .get(asyncHandler(tagController.listByWord))
  .post(requireAdmin, asyncHandler(tagController.create))
tagWordRouter.route('/:wordId/tags/:tagId')
