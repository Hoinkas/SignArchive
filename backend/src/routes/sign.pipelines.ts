import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { signController } from '../controllers/sign.controller'

export const signRouter = Router()
signRouter.route('/').get(asyncHandler(signController.list))
signRouter.route('/:signId')
  .get(asyncHandler(signController.details))