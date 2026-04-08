import { nanoid } from "nanoid"
import { IDefinition, IDefinitionAttached, IDefinitionToDB } from "../models/definition.model"
import { getDb } from "../db/client"
import { IDefinitionSignWord } from "../models/definitionSignWord"
import toSqlParams from "../utils/toSqlParams"

export function getDefinitions(signId: string, wordId: string): IDefinitionAttached[] {
  return getDb()
    .prepare(
      `SELECT definition.* FROM definition
       INNER JOIN definitionSignWord ON definition.id = definitionSignWord.definitionId
       WHERE definitionSignWord.signId = ? AND definitionSignWord.wordId = ?`
    )
    .all(signId, wordId) as IDefinitionAttached[]
}

export function insertDefinition(data: IDefinitionToDB): IDefinitionAttached {
  const definition: IDefinitionAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    ...data
  }

  getDb()
    .prepare(
      'INSERT INTO definition (id, createdAt, category, text, translation) VALUES (@id, @createdAt, @category, @text, @translation)'
    )
    .run(toSqlParams(definition))

  const link: IDefinitionSignWord = {
    definitionId: definition.id,
    signId: data.signId,
    wordId: data.wordId
  }

  getDb()
    .prepare(
      'INSERT INTO definitionSignWord (definitionId, signId, wordId) VALUES (@definitionId, @signId, @wordId)'
    )
    .run(link)

  return definition
}

export function createDefinition(data: IDefinitionToDB): IDefinitionAttached {
  return insertDefinition(data)
}

export function updateDefinition(
  definitionId: string,
  data: Partial<IDefinition>
): IDefinitionAttached | undefined {
  const existing = getDb()
    .prepare('SELECT * FROM definition WHERE id = ?')
    .get(definitionId) as IDefinitionAttached | undefined
  if (!existing) return undefined

  const updated: IDefinitionAttached = { ...existing, ...data, id: definitionId }
  getDb()
    .prepare(
      'UPDATE definition SET category = @category, text = @text, translation = @translation WHERE id = @id'
    )
    .run(updated)
  return updated
}

export function deleteDefinition(definitionId: string): void {
  getDb().prepare('DELETE FROM definition WHERE id = ?').run(definitionId)
}
