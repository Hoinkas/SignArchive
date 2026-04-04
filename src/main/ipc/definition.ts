import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Definition, DefinitionSignWord, DefinitionToDB } from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { ipcMain } from 'electron'
import { createDefinitionSignWord } from './definitionSignWord'

export function findDefinitionById(id: string): Definition | undefined {
  const row = getDb().prepare('SELECT * FROM definition WHERE id = ?').get(id)
  return row as Definition | undefined
}

export function returnAllDefinitionsBySignWordId(signId: string, wordId: string): Definition[] {
  return getDb()
    .prepare(
      `
      SELECT definition.*
      FROM definition
      INNER JOIN definitionSignWord ON definition.id = definitionSignWord.definitionId
      WHERE definitionSignWord.signId = ? AND definitionSignWord.wordId = ?
      `
    )
    .all(signId, wordId) as Definition[]
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
    INSERT INTO definition (id, createdAt, category, text, translation)
    VALUES (@id, @createdAt, @category, @text, @translation)
  `
  ).run(toSqlParams(definition))

  const definitionSignWord: DefinitionSignWord = {
    definitionId: definition.id,
    signId: data.signId,
    wordId: data.wordId
  }
  createDefinitionSignWord(definitionSignWord)
  return definition
}

export function updateDefinition(
  definitionId: string,
  data: Partial<DefinitionToDB>
): Definition | undefined {
  const existing = findDefinitionById(definitionId)
  if (!existing) return

  const dataToDB: Partial<Definition> = {
    ...data,
    id: definitionId
  }

  getDb()
    .prepare(
      `
        UPDATE definition
        SET category = @category, text = @text, translation = @translation
        WHERE id = @id
      `
    )
    .run(toSqlParams(dataToDB))

  return { ...existing, ...data }
}

export function deleteDefinitionById(id: string): void {
  getDb().prepare('DELETE FROM definition WHERE id = ?').run(id)
}

export function registerDefinitionHandlers(): void {
  // ipcMain.handle('definition:list', () => handlerWithErrorLogging(listAllDefinitions))
  // ipcMain.handle('definition:find', (_, id: string) => findDefinitionById(id))
  ipcMain.handle('definition:create', (_, data: DefinitionToDB) => createDefinition(data))
  ipcMain.handle('definition:delete', (_, definitionId: string) =>
    deleteDefinitionById(definitionId)
  )
  ipcMain.handle('definition:update', (_, definitionId: string, data: Partial<DefinitionToDB>) =>
    updateDefinition(definitionId, data)
  )
}
