import { Request, Response } from 'express'
import * as signService from '../services/sign.service'

export const signController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(signService.listAllSignsSimple())
  },
}
