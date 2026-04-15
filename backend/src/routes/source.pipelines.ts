import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { sourceController } from '../controllers/source.controller'

export const sourceRouter = Router()
sourceRouter.get('/regions', asyncHandler(sourceController.listRegions))
sourceRouter.route('/').post(requireAdmin, asyncHandler(sourceController.create))
sourceRouter
  .route('/:sourceId')
  .patch(requireAdmin, asyncHandler(sourceController.update))
  .delete(requireAdmin, asyncHandler(sourceController.delete))

export const sourceListRouter = Router({ mergeParams: true })
sourceListRouter.route('/:signId/words/:wordId/sources').get(asyncHandler(sourceController.list))
