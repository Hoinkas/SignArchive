import type { Request, Response } from 'express'
import * as regionService from '../services/region.service'

export const regionController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    res.json(regionService.listAllRegions())
  },
}
