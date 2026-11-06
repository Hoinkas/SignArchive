import { Request, Response } from 'express'
import * as signService from '../services/sign.service'
import { param } from '../utils/helpers.functions'

export const signController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(signService.listAllSignsSimple())
  },
  details: async (req: Request, res: Response): Promise<void> => {
    const result = signService.getSignDetails(param(req, 'signNumber'))
    if (!result) {
      res.status(404).json({ error: 'Sign not found' })
      return
    }
    res.json(result)
  },
}
