import type { IDefinition, IDefinitionAttached } from '@src/models/definition.model'
import { api } from './client'

export const definitionApi = {
  create: (data: IDefinition): Promise<IDefinitionAttached> =>
    api.post('/definitions', data).then((r) => r.data),

  update: (definitionId: string, data: Partial<IDefinition>): Promise<IDefinitionAttached> =>
    api.patch(`/definitions/${definitionId}`, data).then((r) => r.data),

  delete: (definitionId: string): Promise<void> =>
    api.delete(`/definitions/${definitionId}`).then(() => undefined)
}
