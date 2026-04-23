import type { Request, Response } from 'express'
import * as meaningService from '../services/meaning.service'
import { param } from '../utils/helpers.functions'

export const meaningController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const result = meaningService.createMeaning(req.body, param(req, 'signId'))
    res.status(201).json(result)
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      meaningService.updateMeaning(param(req, 'meaningId'), req.body)
      res.status(204).send()
    } catch {
      res.status(404).json({ error: 'Meaning not found' })
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    meaningService.deleteMeaning(param(req, 'meaningId'))
    res.status(204).send()
  }
}
