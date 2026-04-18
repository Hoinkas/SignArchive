import { Request, Response } from 'express'
import * as sourceService from '../services/source.service'
import { param } from '../utils/helpers.functions'

export const sourceController = {
  // list: async (req: Request, res: Response): Promise<void> => {
  //   res.json(sourceService.listSourcesBySignWord(param(req, 'signId'), param(req, 'wordId')))
  // },
  // listRegions: async (_req: Request, res: Response): Promise<void> => {
  //   res.json(sourceService.listAllRegions())
  // },
  // create: async (req: Request, res: Response): Promise<void> => {
  //   res.status(201).json(sourceService.createSourceWithDetails(req.body))
  // },
  // update: async (req: Request, res: Response): Promise<void> => {
  //   const result = sourceService.updateSource(param(req, 'sourceId'), req.body)
  //   if (!result) {
  //     res.status(404).json({ error: 'Source not found' })
  //     return
  //   }
  //   res.json(result)
  // },
  // delete: async (req: Request, res: Response): Promise<void> => {
  //   sourceService.deleteSource(param(req, 'sourceId'))
  //   res.status(204).send()
  // }
}
