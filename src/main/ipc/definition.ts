import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Definition, DefinitionToDB } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { findDefinitionsIdsBySignWordId } from './definitionSignWord'

export function findDefinitionById(id: string): Definition | undefined {
  const row = getDb().prepare('SELECT * FROM definition WHERE id = ?').get(id)
  return row as Definition | undefined
}

export function returnAllDefinitionsBySignWordId(signId: string, wordId: string): Definition[] {
  const definitionsIds = findDefinitionsIdsBySignWordId(signId, wordId)

  const definitions: Definition[] = []
  definitionsIds.forEach((definitionId) => {
    const definition = findDefinitionById(definitionId)
    if (definition) definitions.push(definition)
  })

  return definitions
}

export function createDefinition(data: DefinitionToDB): Definition {
  const db = getDb()
  const definition: Definition = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO Definition (id, createdAt, category, text, translation)
    VALUES (@id, @createdAt, @category, @text, @translation)
  `
  ).run(toSqlParams(definition))
  return definition
}

export function deleteDefinitionById(id: string): void {
  getDb().prepare('DELETE FROM definition WHERE id = ?').run(id)
}

export function registerDefinitionHandlers(): void {
  // ipcMain.handle('definition:list', () => handlerWithErrorLogging(listAllDefinitions))
  // ipcMain.handle('definition:find', (_, id: string) => findDefinitionById(id))
  // ipcMain.handle('definition:create', (_, data: DefinitionToDB) => createDefinition(data))
  // ipcMain.handle('definition:delete', (_, id: string) => deleteDefinitionById(id))
}
