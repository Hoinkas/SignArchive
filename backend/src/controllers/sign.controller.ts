import { Request, Response } from 'express'
import * as signService from '../services/sign.service'
import { param } from '../utils/helpers.functions'

export const signController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(signService.listAllSignsSimple())
  },
  details: async (req: Request, res: Response): Promise<void> => {
    const result = signService.getSignDetails(param(req, 'signId'))
    if (!result) {
      res.status(404).json({ error: 'Sign not found' })
      return
    }
    res.json(result)
  },
  create: async (req: Request, res: Response): Promise<void> => {
    const { mediaId, ...rest } = req.body
    res.status(201).json(signService.createSign(rest, mediaId))
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const result = signService.updateSign(param(req, 'signId'), req.body)
    if (!result) {
      res.status(404).json({ error: 'Sign not found' })
      return
    }
    res.status(204).send()
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    signService.deleteSign(param(req, 'signId'))
    res.status(204).send()
  }
}
