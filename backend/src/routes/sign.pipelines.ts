import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { signController } from '../controllers/sign.controller'

export const signRouter = Router()
signRouter.route('/').get(asyncHandler(signController.list))
signRouter.route('/').post(requireAdmin, asyncHandler(signController.create))
signRouter
  .route('/:signId')
  .get(asyncHandler(signController.details))
  .patch(requireAdmin, asyncHandler(signController.update))
  .delete(requireAdmin, asyncHandler(signController.delete))
