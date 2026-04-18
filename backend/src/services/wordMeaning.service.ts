import { getDb } from '../db/client'
import { IWordAttached } from '../models/word.model'
import { IWordMeaning } from '../models/wordMeaning.model'
import { deleteUnusedWords } from './word.service'

// CREATE
function createWordMeaningLink(link: IWordMeaning): void {
  getDb()
    .prepare('INSERT INTO wordMeaning (wordId, meaningId) VALUES (@wordId, @meaningId)')
    .run(link)
}

function createWordMeaningLinks(links: IWordMeaning[]): void {
  const transaction = getDb().transaction(() => {
    links.map((l) => createWordMeaningLink(l))
  })

  transaction()
}

export function mapWordsMeaningIdLinks(words: IWordAttached[], meaningId: string): void {
  const links: IWordMeaning[] = words.map((w) => {
    return { meaningId, wordId: w.id }
  })
  createWordMeaningLinks(links)
  deleteUnusedWords()
}
