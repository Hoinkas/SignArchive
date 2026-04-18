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
    const sign = signService.createSign(rest, mediaId)
    const simple = signService.getSignSimple(sign.id)
    if (!simple) {
      res.status(500).json({ error: 'Sign created but could not be retrieved' })
      return
    }
    res.status(201).json(simple)
  },
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      signService.updateSign(param(req, 'signId'), req.body)
      res.status(204).send()
    } catch {
      res.status(404).json({ error: 'Sign not found' })
    }
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    signService.deleteSign(param(req, 'signId'))
    res.status(204).send()
  }
}
