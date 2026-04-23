import { getDb } from '../db/client'
import { IMeaningSource } from '../models/meaningSource.model'

export function createMeaningSourceLink(link: IMeaningSource): void {
  getDb()
    .prepare('INSERT INTO meaningSource (meaningId, sourceId) VALUES (@meaningId, @sourceId)')
    .run(link)
}
