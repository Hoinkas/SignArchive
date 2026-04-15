import { Router } from 'express'
import { asyncHandler, requireAdmin } from '../middlewares/middleware'
import { definitionController } from '../controllers/definition.controller'

export const definitionRouter = Router()
definitionRouter.route('/').post(requireAdmin, asyncHandler(definitionController.create))
definitionRouter
  .route('/:definitionId')
  .patch(requireAdmin, asyncHandler(definitionController.update))
  .delete(requireAdmin, asyncHandler(definitionController.delete))
