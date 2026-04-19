import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IWordAttached, IWord } from '../../../shared/models/word.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { wordTemplate } from '../models/word.model'
import { createWordMeaningLink } from './wordMeaning.service'

// FIND
function findWordByName(name: string): IWordAttached | undefined {
  const row = getDb().prepare('SELECT * FROM word WHERE name = ?').get(name)
  return row ? (row as IWordAttached) : undefined
}

export function findWordsByMeaningId(meaningId: string): IWordAttached[] {
  return getDb()
    .prepare(
      `SELECT word.* FROM word
       INNER JOIN wordMeaning ON wordMeaning.wordId = word.id
       WHERE wordMeaning.meaningId = ?`
    )
    .all(meaningId) as IWordAttached[]
}

export function listAllWords(): IWordAttached[] {
  const row = getDb().prepare('SELECT * FROM word').all()
  return row as IWordAttached[]
}

// RETURN NAMES
export function listWordsNamesBySignId(signId: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT word.name FROM word
    INNER JOIN wordMeaning ON wordMeaning.wordId = word.id
    INNER JOIN meaning ON meaning.id = wordMeaning.meaningId
    WHERE meaning.signId = ?`
    )
    .all(signId) as { name: string }[]

  return rows.flatMap((r) => r.name)
}

// CREATE
function createWord(data: IWord): IWordAttached {
  const existing = findWordByName(data.name)
  if (existing) return existing

  const word: IWordAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    ...data
  }

  getDb()
    .prepare('INSERT INTO word (id, createdAt, name) VALUES (@id, @createdAt, @name)')
    .run(fillMissingValues<IWord>(word, wordTemplate))

  return word
}

export function createWordAndLink(meaningId: string, data: IWord): IWordAttached {
  const transaction = getDb().transaction(() => {
    const word = createWord(data)
    createWordMeaningLink({ meaningId, wordId: word.id })

    return word
  })
  return transaction()
}

// DELETE
function deleteWord(wordId: string): void {
  getDb().prepare('DELETE FROM word WHERE id = ?').run(wordId)
}

export function deleteUnusedWords(): void {
  const rows = getDb()
    .prepare(
      `SELECT word.* FROM word
       LEFT JOIN wordMeaning ON word.id = wordMeaning.wordId
       WHERE wordMeaning.wordId IS NULL`
    )
    .all() as IWordAttached[]

  rows.forEach((r) => deleteWord(r.id))
}

export function deleteWordFromMeaning(meaningId: string, wordId: string): void {
  getDb()
    .prepare('DELETE FROM wordMeaning WHERE meaningId = ? AND wordId = ?')
    .run(meaningId, wordId)
  deleteUnusedWords()
}
