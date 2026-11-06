import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { wordController } from '../controllers/word.controller'

export const wordRouter = Router({ mergeParams: true })

wordRouter
  .route('/')
  .get(asyncHandler(wordController.list))