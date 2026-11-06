import { apiGet } from './client'
import type { IRegionAttached } from '@src/models/region.model'

export const regionApi = {
  list: (): Promise<IRegionAttached[]> => apiGet<IRegionAttached[]>('/regions').then((r) => r.data),
}
