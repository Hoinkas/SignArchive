import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { meaningController } from '../controllers/meaning.controller'

export const meaningRouter = Router({ mergeParams: true })

meaningRouter.route('/').post(requireAdmin, asyncHandler(meaningController.create))

meaningRouter
  .route('/:meaningId')
  .patch(requireAdmin, asyncHandler(meaningController.update))
  .delete(requireAdmin, asyncHandler(meaningController.delete))
