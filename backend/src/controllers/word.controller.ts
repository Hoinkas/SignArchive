import { Request, Response } from 'express'
import * as wordService from '../services/word.service'
import { param } from '../utils/helpers.functions'

export const wordController = {
  details: async (req: Request, res: Response): Promise<void> => {
    const result = wordService.findWordById(req.params['wordId'] as string)
    if (!result) {
      res.status(404).json({ error: 'IWordAttached not found' })
      return
    }
    res.json(result)
  },
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(wordService.listAllWords())
  },
  create: async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(wordService.createWord(req.body))
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const result = wordService.updateWord(param(req, 'wordId'), req.body)
    if (!result) {
      res.status(404).json({ error: 'IWordAttached not found' })
      return
    }
    res.json(result)
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    wordService.deleteWord(param(req, 'wordId'))
    res.status(204).send()
  }
}
