import type { Request, Response } from 'express'
import * as wordService from '../services/word.service'
import { param } from '../utils/helpers.functions'

export const wordController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(wordService.listAllWords())
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const result = wordService.createWordAndLink(param(req, 'meaningId'), req.body)
    res.status(201).json(result)
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    wordService.deleteWordFromMeaning(param(req, 'meaningId'), param(req, 'wordId'))
    res.status(204).send()
  }
}
