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

export function findWordCategoriesById(wordId: string): IWordCategoriesAttached | undefined {
  const word = findWordById(wordId)
  if (!word) return
  const categories = listTagsByWordId(wordId)
  return { ...word, categories }
}

export function findWordById(id: string): IWordAttached | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE id = ?').get(id)
  return row ? (row as IWordAttached) : undefined
}

export function listAllWords(): IWordWithRegionsCategories[] {
  const rows = getDb()
    .prepare(
      `SELECT word.*, COUNT(DISTINCT dsw.signId) AS signsCount
       FROM word
       LEFT JOIN definitionSignWord dsw ON dsw.wordId = word.id
       GROUP BY word.id
       ORDER BY word.text`
    )
    .all() as IWordWithCountAttached[]

  if (rows.length === 0) return []

  return rows.map((row) => ({
    ...row,
    signsCount: row.signsCount,
    categories: tagsByWordId(row.id as string),
    regions: regionsByWordId(row.id as string)
  }))
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
