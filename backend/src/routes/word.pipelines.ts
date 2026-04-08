import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { wordController } from '../controllers/word.controller'

export const wordRouter = Router()
wordRouter
  .route('/')
  .get(asyncHandler(wordController.list))
  .post(asyncHandler(wordController.create))
wordRouter
  .route('/:wordId')
  .get(asyncHandler(wordController.details))
  .patch(asyncHandler(wordController.update))
  .delete(asyncHandler(wordController.delete))
