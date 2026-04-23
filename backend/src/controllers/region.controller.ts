import type { Request, Response } from 'express'
import * as regionService from '../services/region.service'
import { param } from '../utils/helpers.functions'

export const regionController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(regionService.listAllRegions())
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const result = regionService.createRegionAndLink(param(req, 'sourceId'), req.body)
    res.status(201).json(result)
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    regionService.deleteRegionFromSource(param(req, 'sourceId'), param(req, 'regionId'))
    res.status(204).send()
  }
}
