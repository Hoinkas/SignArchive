import { api } from './client'
import type { Definition, DefinitionToDB, DefinitionToCreate } from '@shared/types'

export const definitionApi = {
  create: (data: DefinitionToDB): Promise<Definition> =>
    api.post('/definitions', data).then((r) => r.data),

  update: (definitionId: string, data: Partial<DefinitionToCreate>): Promise<Definition> =>
    api.patch(`/definitions/${definitionId}`, data).then((r) => r.data),

  delete: (definitionId: string): Promise<void> =>
    api.delete(`/definitions/${definitionId}`).then(() => undefined)
}
