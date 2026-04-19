import type { Request, Response } from 'express'
import * as regionService from '../services/region.service'

export const regionController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(regionService.findRegionsBySourceId(_req.params.sourceId))
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const regions = regionService.createRegions([req.body])
    res.status(201).json(regions[0])
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    regionService.deleteUnusedRegions()
    res.status(204).send()
  }
}
