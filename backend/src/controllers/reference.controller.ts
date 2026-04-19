import type { Request, Response } from 'express'
import * as referenceService from '../services/reference.service'
import { param } from '../utils/helpers.functions'

export const referenceController = {
  create: async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(referenceService.createReference(req.body))
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    referenceService.deleteReference(param(req, 'referenceId'))
    res.status(204).send()
  }
}
