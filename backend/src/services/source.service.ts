import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import {
  ISourceAttached,
  ISourceDetails,
  ISourceSignWord,
  ISourceWithDetailsToCreate,
  ISourceWithDetailsToDB
} from '../../../shared/models/source.model'
import { createAuthor, findAuthorById } from './author.service'
import toSqlParams from '../utils/toSqlParams'
import { createEvidence, findEvidenceById } from './evidence.service'

function findSourceById(id: string): ISourceAttached | undefined {
  return getDb().prepare('SELECT * FROM source WHERE id = ?').get(id) as ISourceAttached | undefined
}

function buildSourceDetails(source: ISourceAttached): ISourceDetails | undefined {
  const author = findAuthorById(source.authorId)
  const evidence = findEvidenceById(source.evidenceId)
  if (!author || !evidence) return undefined
  const { authorId, evidenceId, ...rest } = source
  return { ...rest, author, evidence }
}

export function listSourcesBySignWord(signId: string, wordId: string): ISourceDetails[] {
  const sources = getDb()
    .prepare(
      `SELECT source.* FROM source
       INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
       WHERE sourceSignWord.signId = ? AND sourceSignWord.wordId = ?`
    )
    .all(signId, wordId) as ISourceAttached[]

  return sources.flatMap((s) => {
    const details = buildSourceDetails(s)
    return details ? [details] : []
  })
}

export function createSourceWithDetails(data: ISourceWithDetailsToCreate): ISourceDetails {
  const transaction = getDb().transaction(() => {
    const author = createAuthor(data.author)
    const evidence = createEvidence(data.evidence)

    const source: ISourceAttached = {
      id: nanoid(),
      createdAt: Date.now(),
      ...data.source,
      authorId: author.id,
      evidenceId: evidence.id
    }

    getDb()
      .prepare(
        `INSERT INTO source (id, createdAt, authorId, evidenceId, region, yearStart, yearEnd, notes)
         VALUES (@id, @createdAt, @authorId, @evidenceId, @region, @yearStart, @yearEnd, @notes)`
      )
      .run(toSqlParams(source))

    const link: ISourceSignWord = { sourceId: source.id, signId: data.signId, wordId: data.wordId }
    getDb()
      .prepare(
        'INSERT INTO sourceSignWord (sourceId, signId, wordId) VALUES (@sourceId, @signId, @wordId)'
      )
      .run(link)

    const { authorId, evidenceId, ...rest } = source
    return { ...rest, author, evidence } satisfies ISourceDetails
  })
  return transaction()
}

export function updateSource(
  sourceId: string,
  data: ISourceWithDetailsToDB
): ISourceDetails | undefined {
  const existing = findSourceById(sourceId)
  if (!existing) return undefined

  const authorId = data.author ? createAuthor(data.author).id : existing.authorId
  const evidenceId = data.evidence ? createEvidence(data.evidence).id : existing.evidenceId

  const updated: ISourceAttached = {
    ...existing,
    ...data.source,
    authorId,
    evidenceId
  }

  getDb()
    .prepare(
      `UPDATE source
       SET authorId = @authorId, evidenceId = @evidenceId,
           region = @region, yearStart = @yearStart, yearEnd = @yearEnd, notes = @notes
       WHERE id = @id`
    )
    .run(updated)

  return buildSourceDetails(updated)
}

export function deleteSource(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}

export function listAllRegions(): string[] {
  const rows = getDb()
    .prepare(
      `SELECT DISTINCT source.region FROM source
       WHERE source.region IS NOT NULL ORDER BY source.region`
    )
    .all() as { region: string }[]
  return rows.map((r) => r.region)
}
