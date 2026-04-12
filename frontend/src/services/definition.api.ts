import type { IDefinition, IDefinitionAttached } from '@src/models/definition.model'
import { apiPost, apiPatch, apiDelete } from './client'

export const definitionApi = {
  create: (data: IDefinition): Promise<IDefinitionAttached> =>
    apiPost<IDefinition, IDefinitionAttached>('/definitions', data).then((r) => r.data),

  update: (definitionId: string, data: Partial<IDefinition>): Promise<IDefinitionAttached> =>
    apiPatch<Partial<IDefinition>, IDefinitionAttached>(`/definitions/${definitionId}`, data).then(
      (r) => r.data
    ),

  delete: (definitionId: string): Promise<void> =>
    apiDelete(`/definitions/${definitionId}`).then(() => undefined)
}
