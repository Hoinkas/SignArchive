import type { IReference, IReferenceAttached } from '@src/models/reference.model'
import { apiPost, apiDelete, apiPatch } from './client'

export const referenceApi = {
  create: (data: IReference): Promise<IReferenceAttached> =>
    apiPost<IReference, IReferenceAttached>(`/references`, data).then((r) => r.data),
  update: (referenceId: string, data: Partial<IReference>): Promise<IReferenceAttached> =>
    apiPatch<Partial<IReference>, IReferenceAttached>(`/references/${referenceId}`, data).then(
      (r) => r.data
    ),
  delete: (referenceId: string): Promise<void> =>
    apiDelete(`/references/${referenceId}`).then(() => undefined)
}
