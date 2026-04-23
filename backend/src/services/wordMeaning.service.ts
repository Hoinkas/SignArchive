import { getDb } from '../db/client'
import { IWordMeaning } from '../models/wordMeaning.model'

// CREATE
export function createWordMeaningLink(link: IWordMeaning): void {
  getDb()
    .prepare('INSERT INTO wordMeaning (wordId, meaningId) VALUES (@wordId, @meaningId)')
    .run(link)
}
