import { Request, Response } from 'express'
import * as signService from '../services/sign.service'

export const signController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(signService.listAllSignsSimple())
  }
  // create: async (req: Request, res: Response): Promise<void> => {
  //   res.status(201).json(signService.createSignWithMedia(req.body))
  // },
  // update: async (req: Request, res: Response): Promise<void> => {
  //   const result = signService.updateSign(param(req, 'signId'), req.body)
  //   if (!result) {
  //     res.status(404).json({ error: 'Sign not found' })
  //     return
  //   }
  //   res.json(result)
  // },
  // delete: async (req: Request, res: Response): Promise<void> => {
  //   signService.deleteSign(param(req, 'signId'))
  //   res.status(204).send()
  // }
}
