import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { signController } from '../controllers/sign.controller'

export const signRouter = Router()
signRouter.route('/:wordId/signs').get(asyncHandler(signController.list))
signRouter.route('/').post(asyncHandler(signController.create))
signRouter
  .route('/:signId')
  .patch(asyncHandler(signController.update))
  .delete(asyncHandler(signController.delete))
