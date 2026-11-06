import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { regionController } from '../controllers/region.controller'

export const regionRouter = Router({ mergeParams: true })

regionRouter
  .route('/')
  .get(asyncHandler(regionController.list))