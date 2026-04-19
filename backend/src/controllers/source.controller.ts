import type { Request, Response } from 'express'
import * as sourceService from '../services/source.service'
import { param } from '../utils/helpers.functions'

export const sourceController = {
  listByMeaning: async (req: Request, res: Response): Promise<void> => {
    res.json(sourceService.listSourcesByMeaningId(param(req, 'meaningId')))
  },

  create: async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(sourceService.createSourceWithDetails(req.body))
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      sourceService.updateSource(param(req, 'sourceId'), req.body)
      res.status(204).send()
    } catch {
      res.status(404).json({ error: 'Source not found' })
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    sourceService.deleteSource(param(req, 'sourceId'))
    res.status(204).send()
  }
}
