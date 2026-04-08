import { Request, Response } from 'express'
import * as definitionService from '../services/definition.service'
import { param } from '../utils/helpers.functions'

export const definitionController = {
  create: async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(definitionService.createDefinition(req.body))
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const result = definitionService.updateDefinition(param(req, 'definitionId'), req.body)
    if (!result) { res.status(404).json({ error: 'Definition not found' }); return }
    res.json(result)
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    definitionService.deleteDefinition(param(req, 'definitionId'))
    res.status(204).send()
  }
}
