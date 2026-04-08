import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { ISourceAttached, ISourceDetails, ISourceSignWord, ISourceWithDetailsToCreate, ISourceWithDetailsToDB } from '../models/source.model'
import { createAuthor, findAuthorById } from './author.service'
import { createMediaFile, findMediaFileById } from './mediaFile.service'
import toSqlParams from '../utils/toSqlParams'

function findSourceById(id: string): ISourceAttached | undefined {
  return getDb().prepare('SELECT * FROM source WHERE id = ?').get(id) as ISourceAttached | undefined
}

function buildSourceDetails(source: ISourceAttached): ISourceDetails | undefined {
  const author = findAuthorById(source.authorId)
  const mediaFile = findMediaFileById(source.mediaFileId)
  if (!author || !mediaFile) return undefined
  const { authorId, mediaFileId, ...rest } = source
  return { ...rest, author, mediaFile }
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
    const mediaFile = createMediaFile(data.mediaFile)

    const source: ISourceAttached = {
      id: nanoid(),
      createdAt: Date.now(),
      ...data.source,
      authorId: author.id,
      mediaFileId: mediaFile.id
    }

    getDb()
      .prepare(
        `INSERT INTO source (id, createdAt, authorId, mediaFileId, region, yearStart, yearEnd, notes)
         VALUES (@id, @createdAt, @authorId, @mediaFileId, @region, @yearStart, @yearEnd, @notes)`
      )
      .run(toSqlParams(source))

    const link: ISourceSignWord = { sourceId: source.id, signId: data.signId, wordId: data.wordId }
    getDb()
      .prepare(
        'INSERT INTO sourceSignWord (sourceId, signId, wordId) VALUES (@sourceId, @signId, @wordId)'
      )
      .run(link)

    const { authorId, mediaFileId, ...rest } = source
    return { ...rest, author, mediaFile } satisfies ISourceDetails
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
  const mediaFileId = data.mediaFile ? createMediaFile(data.mediaFile).id : existing.mediaFileId

  const updated: ISourceAttached = {
    ...existing,
    ...data.source,
    authorId,
    mediaFileId
  }

  getDb()
    .prepare(
      `UPDATE source
       SET authorId = @authorId, mediaFileId = @mediaFileId,
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
