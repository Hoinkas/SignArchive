import { Request, Response } from 'express'
import * as tagService from '../services/tag.service'
import { param } from '../utils/helpers.functions'

export const tagController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(tagService.listAllTags())
  },
  listByWord: async (req: Request, res: Response): Promise<void> => {
    res.json(tagService.listTagsByWordId(param(req, 'wordId')))
  },
  create: async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(tagService.createTagAndLink(param(req, 'wordId'), req.body))
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    tagService.deleteTag(param(req, 'tagId'))
    res.status(204).send()
  }
}
