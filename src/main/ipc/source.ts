import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type {
  Source,
  SourceSign,
  SourceToDB,
  SourceWithDetailsToDB,
  SourceWithSignerAuthorMediaFile,
  YearStartEnd
} from '@shared/types'
import toSqlParams from '../utils/toSqlParams'
import { createSigner, findSignerById } from './signer'
import { createAuthor, findAuthorById } from './author'
import { createMediaFile, findMediaFileById } from './mediaFile'
import { createSourceSign } from './sourceSign'

export function listAllSources(): Source[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM source ORDER BY name').all()
  return rows as Source[]
}

export function findSourceById(id: string): Source | undefined {
  const row = getDb().prepare('SELECT * FROM source WHERE id = ?').get(id)
  return row as Source | undefined
}

export function findMainSourceBySignId(signId: string): Source | undefined {
  const row = getDb()
    .prepare(
      `
      SELECT * FROM source
      INNER JOIN sourceSign ON source.id = sourceSign.sourceId
      WHERE sourceSign.signId = ? AND sourceSign.isMainSource = 1
    `
    )
    .get(signId)

  if (!row) return

  return row as Source
}

export function findAllNonMainSourcesBySignId(signId: string): Source[] {
  const row = getDb()
    .prepare(
      `
      SELECT * FROM source
      INNER JOIN sourceSign ON source.id = sourceSign.sourceId
      WHERE sourceSign.signId = ? AND sourceSign.isMainSource = 0
    `
    )
    .all(signId)

  return row as Source[]
}

export function getSourcesStartEndYearBySignId(signId: string): YearStartEnd {
  const row = getDb()
    .prepare(
      `
      SELECT MIN(source.yearStart) AS yearStartMin, MAX(source.yearStart) AS yearStartMax,
      MAX(source.yearEnd) AS yearEndMax, MIN(source.yearEnd) AS yearEndMin
      FROM source
      INNER JOIN sourceSign ON source.id = sourceSign.sourceId
      WHERE sourceSign.signId = ?
    `
    )
    .get(signId)

  const yearsRaw: number[] = [
    row.yearStartMin,
    row.yearStartMax,
    row.yearEndMin,
    row.yearEndMax
  ].filter((y) => y !== null)

  const years: YearStartEnd = {
    yearStart: Math.min(...yearsRaw),
    yearEnd: Math.max(...yearsRaw)
  }

  return years
}

export function returnSourcesCountBySignId(signId: string): number {
  const row = getDb()
    .prepare(
      `
        SELECT COUNT(*) AS count
        FROM sign
        INNER JOIN sourceSign ON sign.id = sourceSign.signId
        WHERE sourceSign.signId = ?
      `
    )
    .get(signId)
  return row.count
}

export function returnSourceDetailsById(
  sourceId: string
): SourceWithSignerAuthorMediaFile | undefined {
  const source = findSourceById(sourceId)
  if (!source) return

  const author = findAuthorById(source.authorId)
  const signer = findSignerById(source.signerId)
  const mediaFile = findMediaFileById(source.mediaFileId)

  if (!author || !signer || !mediaFile) return

  return {
    ...source,
    signer,
    author,
    mediaFile
  }
}

export function returnNonMainSourcesDetailsBySignId(
  signId: string
): SourceWithSignerAuthorMediaFile[] {
  const sources = findAllNonMainSourcesBySignId(signId)

  const sourcesDetails: SourceWithSignerAuthorMediaFile[] = []
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
    INSERT INTO source (id, createdAt, signerId, authorId, mediaFileId, region, yearStart, yearEnd, notes)
    VALUES (@id, @createdAt, @signerId, @authorId, @mediaFileId, @region, @yearStart, @yearEnd, @notes)
  `
  ).run(toSqlParams(source))
  return source
}

export function createSourceWithDetails(data: SourceWithDetailsToDB): Source {
  const db = getDb()

  const createdMediaFile = createMediaFile(data.mediaFile)
  const createdSigner = createSigner(data.signer)
  const createdAuthor = createAuthor(data.author)

  const source: Source = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data.source,
    signerId: createdSigner.id,
    authorId: createdAuthor.id,
    mediaFileId: createdMediaFile.id
  }

  db.prepare(
    `
    INSERT INTO source (id, createdAt, signerId, authorId, mediaFileId, region, yearStart, yearEnd, notes)
    VALUES (@id, @createdAt, @signerId, @authorId, @mediaFileId, @region, @yearStart, @yearEnd, @notes)
  `
  ).run(toSqlParams(source))

  const sourceSign: SourceSign = { sourceId: source.id, signId: data.signId, isMainSource: 0 }
  createSourceSign(sourceSign)

  return source
}

export function deleteSourceById(id: string): void {
  getDb().prepare('DELETE FROM source WHERE id = ?').run(id)
}

export function registerSourceHandlers(): void {
  ipcMain.handle('source:list', (_, signId: string) => returnNonMainSourcesDetailsBySignId(signId))
  ipcMain.handle('source:details', (_, sourceId: string) => returnSourceDetailsById(sourceId))
  ipcMain.handle('source:create', (_, data: SourceWithDetailsToDB) => createSourceWithDetails(data))
  // ipcMain.handle('source:delete', (_, id: string) => deleteSourceById(id))
}
