import { Request, Response } from 'express'
import * as signService from '../services/sign.service'
import { param } from '../utils/helpers.functions'

export const signController = {
  list: async (req: Request, res: Response): Promise<void> => {
    res.json(signService.listSignsByWord(param(req, 'wordId')))
  },
  create: async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(signService.createSignWithDefinition(req.body))
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const result = signService.updateSign(param(req, 'signId'), req.body)
    if (!result) {
      res.status(404).json({ error: 'Sign not found' })
      return
    }
    res.json(result)
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    signService.deleteSign(param(req, 'signId'))
    res.status(204).send()
  },
  yearsRegions: async (req: Request, res: Response): Promise<void> => {
    res.json(signService.getYearsRegionsBySignId(param(req, 'signId'), param(req, 'wordId')))
  }
}
