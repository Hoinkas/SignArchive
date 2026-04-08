import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { sourceController } from '../controllers/source.controller'

export const sourceRouter = Router()
sourceRouter.get('/regions', asyncHandler(sourceController.listRegions))
sourceRouter.route('/').post(asyncHandler(sourceController.create))
sourceRouter
  .route('/:sourceId')
  .patch(asyncHandler(sourceController.update))
  .delete(asyncHandler(sourceController.delete))

export const sourceListRouter = Router({ mergeParams: true })
sourceListRouter.route('/:signId/words/:wordId/sources').get(asyncHandler(sourceController.list))
