import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { wordController } from '../controllers/word.controller'

export const wordRouter = Router()
wordRouter
  .route('/')
  .get(asyncHandler(wordController.list))
  .post(requireAdmin, asyncHandler(wordController.create))
wordRouter
  .route('/:wordId')
  .get(asyncHandler(wordController.details))
  .patch(requireAdmin, asyncHandler(wordController.update))
  .delete(requireAdmin, asyncHandler(wordController.delete))
wordRouter.route('/name/:name').get(asyncHandler(wordController.findByName))
