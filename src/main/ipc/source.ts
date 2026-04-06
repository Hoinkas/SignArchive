import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  Source,
  SourceSignWord,
  SourceToDB,
  SourceDetails,
  SourceWithDetailsToCreate,
  SourceWithDetailsToDB,
  YearStartEnd,
  YearsRegions
} from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { createAuthor, findAuthorById } from './author'
import { createMediaFile, findMediaFileById } from './mediaFile'
import { ipcMain } from 'electron'
import { createSourceSignWord } from './sourceSignWord'

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

export function returnAllRegionsBySignAndWordId(signId: string, wordId: string): string[] {
  const rows = getDb()
    .prepare(
      `
        SELECT DISTINCT source.region FROM source
        INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
        WHERE sourceSignWord.wordId = ? AND sourceSignWord.signId = ?
      `
    )
    .all(wordId, signId)

  const result: string[] = []
  rows.forEach((r) => {
    if (r.region) result.push(r.region)
  })

  return result
}

export function returnAllRegions(): string[] {
  const rows = getDb()
    .prepare(
      `
        SELECT DISTINCT source.region FROM source
        INNER JOIN sourceSignWord ON source.id = sourceSignWord.sourceId
      `
    )
    .all()

  const result: string[] = []
  rows.forEach((r) => {
    if (r.region) result.push(r.region)
  })

  return result
}

export function returnYearsRegionsBySignAndWordId(signId: string, wordId: string): YearsRegions {
  const { yearStart, yearEnd } = getSourcesStartEndYearBySignAndWordId(signId, wordId)
  const regions = returnAllRegionsBySignAndWordId(signId, wordId)

  return { yearStart, yearEnd, regions }
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

export function returnSourceDetailsById(sourceId: string): SourceDetails | undefined {
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

export function returnSourcesDetailsBySignWordId(signId: string, wordId: string): SourceDetails[] {
  const sources = findAllSourcesBySignWordId(signId, wordId)

  const sourcesDetails: SourceDetails[] = []
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

export function createSourceWithDetails(data: SourceWithDetailsToCreate): SourceDetails {
  const transaction = getDb().transaction(() => {
    const createdMediaFile = createMediaFile(data.mediaFile)
    const createdAuthor = createAuthor(data.author)

    const source: SourceToDB = {
      ...data.source,
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

    const sourceWihtDetails: SourceDetails = {
      ...createdSource,
      author: createdAuthor,
      mediaFile: createdMediaFile
    }
    return sourceWihtDetails
  })

  return transaction()
}

export function updateSource(
  sourceId: string,
  data: Partial<SourceWithDetailsToDB>
): SourceDetails | undefined {
  const existing = findSourceById(sourceId)
  if (!existing) return

  const updatedAuthorId = data.author ? createAuthor(data.author).id : existing.authorId
  const updatedMediaFileId = data.mediaFile
    ? createMediaFile(data.mediaFile).id
    : existing.mediaFileId

  const dataToDB: Partial<Source> = {
    ...data.source,
    id: sourceId,
    authorId: updatedAuthorId,
    mediaFileId: updatedMediaFileId
  }

  getDb()
    .prepare(
      `
      UPDATE source
      SET authorId = @authorId, mediaFileId = @mediaFileId, region = @region,
          yearStart = @yearStart, yearEnd = @yearEnd, notes = @notes
      WHERE id = @id
    `
    )
    .run(toSqlParams(dataToDB))

  const returnData = returnSourceDetailsById(sourceId)

  return returnData
}

export function deleteSourceById(sourceId: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(sourceId)
}

export function registerSourceHandlers(): void {
  ipcMain.handle('source:list', (_, signId: string, wordId: string) =>
    returnSourcesDetailsBySignWordId(signId, wordId)
  )
  ipcMain.handle('source:details', (_, sourceId: string) => returnSourceDetailsById(sourceId))
  ipcMain.handle('source:regions', () => returnAllRegions())
  ipcMain.handle('source:update', (_, sourceId: string, data: Partial<SourceWithDetailsToDB>) =>
    updateSource(sourceId, data)
  )
  ipcMain.handle('source:create', (_, data: SourceWithDetailsToCreate) =>
    createSourceWithDetails(data)
  )
  ipcMain.handle('source:delete', (_, sourceId: string) => deleteSourceById(sourceId))
}
