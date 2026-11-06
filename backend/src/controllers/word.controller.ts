import type { Request, Response } from 'express'
import * as wordService from '../services/word.service'

export const wordController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(wordService.listAllWords())
  },
}
