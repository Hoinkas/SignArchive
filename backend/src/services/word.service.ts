import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { ITagAttached } from '../../../shared/models/tag.model'
import {
  IWordAttached,
  IWordCategoriesAttached,
  IWordToDB,
  IWordWithCountAttached,
  IWordWithRegionsCategories
} from '../../../shared/models/word.model'
import { addAndRemoveTagsFromWord, addManyTagsToWord, listTagsByWordId } from './tag.service'
import { IDefinitionSignWord } from '../models/definitionSignWord'

function tagsByWordId(wordId: string): ITagAttached[] {
  return getDb()
    .prepare(
      `SELECT tag.* FROM tag
       INNER JOIN tagWord ON tag.id = tagWord.tagId
       WHERE tagWord.wordId = ? ORDER BY tag.name`
    )
    .all(wordId) as ITagAttached[]
}

function regionsByWordId(wordId: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT DISTINCT source.region FROM source
       INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
       WHERE sourceSignWord.wordId = ? AND source.region IS NOT NULL`
    )
    .all(wordId) as { region: string }[]
  return rows.map((r) => r.region)
}

export function findWordById(id: string): IWordCategoriesAttached | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(id)
  return row ? (row as IWordCategoriesAttached) : undefined
}

function buildWordsQuery(whereClause?: string): string {
  return `
    SELECT word.*, COUNT(DISTINCT dsw.signId) AS signsCount
    FROM word
    LEFT JOIN definitionSignWord dsw ON dsw.wordId = word.id
    ${whereClause ? `WHERE ${whereClause}` : ''}
    GROUP BY word.id
    ORDER BY word.text
  `
}

function mapWordRow(row: IWordWithCountAttached): IWordWithRegionsCategories {
  return {
    ...row,
    signsCount: row.signsCount,
    categories: tagsByWordId(row.id as string),
    regions: regionsByWordId(row.id as string)
  }
}

export function findWordByName(name: string): IWordWithRegionsCategories | undefined {
  const result = getDb().prepare(buildWordsQuery('word.text = ?')).get(name) as
    | IWordWithCountAttached
    | undefined

  if (!result) return undefined
  return mapWordRow(result)
}

export function listAllWords(): IWordWithRegionsCategories[] {
  const rows = getDb().prepare(buildWordsQuery()).all() as IWordWithCountAttached[]

  return rows.map(mapWordRow)
}

export function createWord(data: IWordToDB): IWordCategoriesAttached {
  const db = getDb()
  const word: IWordAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    text: data.text
  }

  db.prepare('INSERT INTO word (id, createdAt, text) VALUES (@id, @createdAt, @text)').run(word)

  const categories = addManyTagsToWord(data.categories, word.id)

  return { ...word, categories }
}

export function updateWord(
  wordId: string,
  data: Partial<IWordToDB>
): IWordCategoriesAttached | undefined {
  const existing = findWordById(wordId)
  if (!existing) return undefined

  if (data.text) {
    getDb()
      .prepare('UPDATE word SET text = @text WHERE id = @id')
      .run({ text: data.text, id: wordId })
  }

  const newWord = findWordById(wordId)
  if (!newWord) return undefined

  const categories = data.categories
    ? addAndRemoveTagsFromWord(data.categories, wordId)
    : listTagsByWordId(wordId)

  return { ...newWord, categories }
}

export function deleteWord(wordId: string): void {
  getDb().prepare('DELETE FROM word WHERE id = ?').run(wordId)
}

export function removeWordIfEmpty(wordId: string): void {
  const result = getDb()
    .prepare('SELECT * FROM definitionSignWord WHERE wordId = ?')
    .get(wordId) as IDefinitionSignWord | undefined

  console.log(result)

  if (!result) deleteWord(wordId)
}
