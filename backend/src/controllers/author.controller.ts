import { Request, Response } from 'express'
import * as authorService from '../services/author.service'
import { param } from '../utils/helpers.functions'

export const authorController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(authorService.listAllAuthors())
  }
}
