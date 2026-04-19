import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { referenceController } from '../controllers/reference.controller'

export const referenceRouter = Router({ mergeParams: true })

referenceRouter.route('/').post(requireAdmin, asyncHandler(referenceController.create))

referenceRouter
  .route('/:referenceId')
  .patch(requireAdmin, asyncHandler(referenceController.update))
  .delete(requireAdmin, asyncHandler(referenceController.delete))
