import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  Source,
  SourceSignWord,
  SourceToDB,
  SourceWithAuthorMediaFile,
  SourceWithDetailsToCreate,
  SourceWithDetailsToDB,
  YearStartEnd
} from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { createAuthor, findAuthorById } from './author'
import { createMediaFile, findMediaFileById } from './mediaFile'
import { ipcMain } from 'electron'
import { createSourceSignWord } from './sourceSignWord'

export function listAllSources(): Source[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM source ORDER BY name').all()
  return rows as Source[]
}

export function findSourceById(id: string): Source | undefined {
  const row = getDb().prepare('SELECT * FROM source WHERE id = ?').get(id)
  return row as Source | undefined
}

export function findAllSourcesBySignWordId(signId: string, wordId: string): Source[] {
  const row = getDb()
    .prepare(
      `
      SELECT * FROM source
      INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
      WHERE sourceSignWord.signId = ?
        AND sourceSignWord.wordId = ?
    `
    )
    .all(signId, wordId)

  return row as Source[]
}

export function getSourcesStartEndYearBySignAndWordId(
  signId: string,
  wordId: string
): YearStartEnd {
  const row = getDb()
    .prepare(
      `
      SELECT
        MIN(source.yearStart) AS yearStartMin,
        MAX(source.yearStart) AS yearStartMax,
        MAX(source.yearEnd) AS yearEndMax,
        MIN(source.yearEnd) AS yearEndMin
      FROM source
        INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
      WHERE sourceSignWord.signId = ? AND sourceSignWord.wordId = ?
    `
    )
    .get(signId, wordId)

  const yearsRaw: number[] = [
    row.yearStartMin,
    row.yearStartMax,
    row.yearEndMin,
    row.yearEndMax
  ].filter((y) => y !== null)

  if (yearsRaw.length <= 0) {
    return { yearStart: null, yearEnd: null } as YearStartEnd
  }

  return {
    yearStart: Math.min(...yearsRaw),
    yearEnd: Math.max(...yearsRaw)
  } as YearStartEnd
}

export function returnSourcesCountBySignId(signId: string): number {
  const row = getDb()
    .prepare(
      `
        SELECT COUNT(*) AS count
        FROM sign
        INNER JOIN sourceSignWord ON sign.id = sourceSignWord.signId
        WHERE sourceSignWord.signId = ?
      `
    )
    .get(signId)
  return row.count
}

export function returnSourceDetailsById(sourceId: string): SourceWithAuthorMediaFile | undefined {
  const source = findSourceById(sourceId)
  if (!source) return

  const author = findAuthorById(source.authorId)
  const mediaFile = findMediaFileById(source.mediaFileId)

  if (!author || !mediaFile) return

  return {
    ...source,
    author,
    mediaFile
  }
}

export function returnSourcesDetailsBySignWordId(
  signId: string,
  wordId: string
): SourceWithAuthorMediaFile[] {
  const sources = findAllSourcesBySignWordId(signId, wordId)

  const sourcesDetails: SourceWithAuthorMediaFile[] = []
  sources.forEach((s) => {
    const details = returnSourceDetailsById(s.id)
    if (!details) return
    sourcesDetails.push(details)
  })

  return sourcesDetails
}

export function createSource(data: SourceToDB): Source {
  const db = getDb()
  const source: Source = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
    INSERT INTO source (id, createdAt, authorId, mediaFileId, region, yearStart, yearEnd, notes)
    VALUES (@id, @createdAt, @authorId, @mediaFileId, @region, @yearStart, @yearEnd, @notes)
  `
  ).run(toSqlParams(source))

  return source
}

export function createSourceWithDetails(
  data: SourceWithDetailsToCreate
): SourceWithAuthorMediaFile {
  const transaction = getDb().transaction(() => {
    const createdMediaFile = createMediaFile(data.mediaFile)
    const createdAuthor = createAuthor(data.author)

    const source: SourceToDB = {
      ...data,
      authorId: createdAuthor.id,
      mediaFileId: createdMediaFile.id
    }

    const createdSource: Source = createSource(source)

    const sourceSignWord: SourceSignWord = {
      sourceId: createdSource.id,
      signId: data.signId,
      wordId: data.wordId
    }
    createSourceSignWord(sourceSignWord)

    const sourceWihtDetails: SourceWithAuthorMediaFile = {
      ...createdSource,
      author: createdAuthor,
      mediaFile: createdMediaFile
    }
    return sourceWihtDetails
  })

  return transaction()
}

export function updateSource(sourceId: string, data: Partial<SourceWithDetailsToDB>): void {
  const existing = findSourceById(sourceId)
  if (!existing) return

  const updatedAuthorId = data.author ? createAuthor(data.author).id : existing.authorId
  const updatedMediaFileId = data.mediaFile
    ? createMediaFile(data.mediaFile).id
    : existing.mediaFileId

  getDb()
    .prepare(
      `
      UPDATE source
      SET authorId = @authorId, mediaFileId = @mediaFileId, region = @region,
          yearStart = @yearStart, yearEnd = @yearEnd, notes = @notes
      WHERE id = @id
    `
    )
    .run(
      toSqlParams({
        ...data,
        id: sourceId,
        authorId: updatedAuthorId,
        mediaFileId: updatedMediaFileId
      })
    )
}

export function deleteSourceById(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}

export function registerSourceHandlers(): void {
  ipcMain.handle('source:list', (_, signId: string, wordId: string) =>
    returnSourcesDetailsBySignWordId(signId, wordId)
  )
  ipcMain.handle('source:details', (_, sourceId: string) => returnSourceDetailsById(sourceId))
  ipcMain.handle('source:update', (_, sourceId: string, data: Partial<SourceWithDetailsToDB>) =>
    updateSource(sourceId, data)
  )
  ipcMain.handle('source:create', (_, data: SourceWithDetailsToCreate) =>
    createSourceWithDetails(data)
  )
  ipcMain.handle('source:delete', (_, sourceId: string) => deleteSourceById(sourceId))
}
