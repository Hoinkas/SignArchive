import { apiGet, apiPost, apiDelete } from './client'
import type { IRegion, IRegionAttached } from '@src/models/region.model'

export const regionApi = {
  list: (): Promise<IRegionAttached[]> => apiGet<IRegionAttached[]>('/regions').then((r) => r.data),

  create: (sourceId: string, data: IRegion): Promise<IRegionAttached> =>
    apiPost<IRegion, IRegionAttached>(`/sources/${sourceId}/regions`, data).then((r) => r.data),

  delete: (sourceId: string, regionId: string): Promise<void> =>
    apiDelete(`/sources/${sourceId}/regions/${regionId}`).then(() => undefined)
}
