import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { wordController } from '../controllers/word.controller'

export const wordRouter = Router({ mergeParams: true })

wordRouter
  .route('/')
  .get(asyncHandler(wordController.list))
  .post(requireAdmin, asyncHandler(wordController.create))

wordRouter.route('/:wordId').delete(requireAdmin, asyncHandler(wordController.delete))
