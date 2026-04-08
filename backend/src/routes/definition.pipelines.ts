import { Router } from 'express'
import { asyncHandler } from '../middlewares/middleware'
import { definitionController } from '../controllers/definition.controller'

export const definitionRouter = Router()
definitionRouter.route('/').post(asyncHandler(definitionController.create))
definitionRouter
  .route('/:definitionId')
  .patch(asyncHandler(definitionController.update))
  .delete(asyncHandler(definitionController.delete))
