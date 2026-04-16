import { nanoid } from 'nanoid'
import {
  DefinitionsCategories,
  IDefinition,
  IDefinitionAttached,
  IDefinitionToDB
} from '../../../shared/models/definition.model'
import { getDb } from '../db/client'
import { IDefinitionSignWord } from '../../../shared/models/definitionSignWord'
import toSqlParams from '../utils/toSqlParams'
import { createWord, findWordByName } from './word.service'

export function findDefinitionById(id: string): IDefinitionAttached | undefined {
  return getDb().prepare('SELECT * FROM definition WHERE id = ?').get(id) as
    | IDefinitionAttached
    | undefined
}

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
      'INSERT INTO definition (id, createdAt, category, text, translations) VALUES (@id, @createdAt, @category, @text, @translations)'
    )
    .run(toSqlParams(definition))

  const link: IDefinitionSignWord = {
    definitionId: definition.id,
    signId: data.signId,
    wordId: data.wordId
  }

  createDefinitionSignWordLink(link)
  createLinksForEachTranslation(data.category.split(', '), link)

  return definition
}

function createLinksForEachTranslation(translations: string[], link: IDefinitionSignWord) {
  translations.forEach((c) => {
    let word = findWordByName(c)
    if (!word) word = createWord({ text: c, categories: [] })

    createDefinitionSignWordLink({ ...link, wordId: word.id })
  })
}

function deleteLinksForEachTranslation(toRemove: string[], definitionId: string) {
  toRemove.forEach((translation) => {
    const word = findWordByName(translation)
    if (!word) return
    getDb()
      .prepare('DELETE FROM definitionSignWord WHERE definitionId = ? AND wordId = ?')
      .run(definitionId, word.id)
  })
}

function createDefinitionSignWordLink(link: IDefinitionSignWord) {
  getDb()
    .prepare(
      'INSERT OR IGNORE INTO definitionSignWord (definitionId, signId, wordId) VALUES (@definitionId, @signId, @wordId)'
    )
    .run(link)
}

export function createDefinition(data: IDefinitionToDB): IDefinitionAttached {
  return insertDefinition(data)
}

function findWordSignIdsByDefinitionId(definitionId: string): IDefinitionSignWord | undefined {
  return getDb()
    .prepare('SELECT * FROM definitionSignWord WHERE definitionId = ?')
    .get(definitionId) as IDefinitionSignWord | undefined
}

export function updateDefinition(
  definitionId: string,
  data: Partial<IDefinition>
): IDefinitionAttached | undefined {
  const existing = findDefinitionById(definitionId)
  if (!existing) return undefined

  const updated: IDefinitionAttached = { ...existing, ...data, id: definitionId }
  getDb()
    .prepare(
      'UPDATE definition SET category = @category, text = @text, translations = @translations WHERE id = @id'
    )
    .run(updated)

  const definitionSignWordIds = findWordSignIdsByDefinitionId(definitionId)
  if (!definitionSignWordIds) return updated

  const link: IDefinitionSignWord = {
    definitionId,
    signId: definitionSignWordIds.signId,
    wordId: definitionSignWordIds.wordId
  }

  const oldTranslations = existing.translations?.split(', ') ?? []
  const newTranslations = data.translations?.split(', ') ?? []

  const toAdd = newTranslations.filter((t) => !oldTranslations.includes(t))
  if (toAdd.length > 0) createLinksForEachTranslation(toAdd, link)

  const toRemove = oldTranslations.filter((t) => !newTranslations.includes(t))
  deleteLinksForEachTranslation(toRemove, definitionId)

  return updated
}

export function deleteDefinition(definitionId: string): void {
  getDb().prepare('DELETE FROM definition WHERE id = ?').run(definitionId)
}
