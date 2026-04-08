import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { authorController } from '../controllers/author.controller'

export const authorRouter = Router()
authorRouter.get('/', asyncHandler(authorController.list))
