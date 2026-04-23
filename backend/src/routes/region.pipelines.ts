import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { regionController } from '../controllers/region.controller'

export const regionRouter = Router({ mergeParams: true })

regionRouter
  .route('/')
  .get(asyncHandler(regionController.list))
  .post(requireAdmin, asyncHandler(regionController.create))

regionRouter.route('/:regionId').delete(requireAdmin, asyncHandler(regionController.delete))
