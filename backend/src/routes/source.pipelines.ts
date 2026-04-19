import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { sourceController } from '../controllers/source.controller'

export const sourceRouter = Router({ mergeParams: true })

sourceRouter
  .route('/')
  .get(asyncHandler(sourceController.listByMeaning))
  .post(requireAdmin, asyncHandler(sourceController.create))

sourceRouter
  .route('/:sourceId')
  .patch(requireAdmin, asyncHandler(sourceController.update))
  .delete(requireAdmin, asyncHandler(sourceController.delete))
