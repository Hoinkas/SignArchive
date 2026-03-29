import { ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import type { Sign, SignToDB, SignWithDetailsToDB, SignWithSourceDetails } from '@shared/types'
import { toSqlParams } from '../db/utils'
import { getSourcesStartEndYearBySignId, findMainSourceBySignId, createSource } from './source'
import { createMeaningSign } from './meaningSign'
import { createMediaFile } from './mediaFile'
import { createAuthor } from './author'
import { createSigner } from './signer'
import { createSourceSign } from './sourceSign'

export function listAllSigns(): Sign[] {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM sign ORDER BY createdAt DESC').all()
  return rows as Sign[]
}

export function findSignById(id: string): Sign | undefined {
  const row = getDb().prepare('SELECT * FROM sign WHERE id = ?').get(id)
  return row as Sign | undefined
}

export function returnSignsCountByWordId(wordId: string): number {
  const row = getDb()
    .prepare(
      `
        SELECT COUNT(DISTINCT sign.id) AS count
        FROM sign
        INNER JOIN meaningSign ON sign.id = meaningSign.signId
        INNER JOIN meaning ON meaningSign.meaningId = meaning.id
        WHERE meaning.wordId = ?
      `
    )
    .get(wordId)
  return row.count
}

export function returnSignDetailsById(signId: string): SignWithSourceDetails | undefined {
  const sign = findSignById(signId)
  if (!sign) return

  // const sourcesIds = findSourcesIdsBySignId(sign.id)
  // const sources: SourceWithSignerAuthorMediaFile[] = []

  // sourcesIds.forEach((sourceId) => {
  //   const sourceDetail = returnSourceDetailsById(sourceId)
  //   if (!sourceDetail) return
  //   sources.push(sourceDetail)
  // })

  const source = findMainSourceBySignId(sign.id)
  if (!source) return

  const { yearStart, yearEnd } = getSourcesStartEndYearBySignId(sign.id)

  return {
    ...sign,
    source,
    yearStart,
    yearEnd
  }
}

export function createSign(data: SignToDB): Sign {
  const db = getDb()
  const sign: Sign = {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    ...data
  }
  db.prepare(
    `
      INSERT INTO sign (id, createdAt, notes)
      VALUES (@id, @createdAt, @notes)
    `
  ).run(toSqlParams(sign))
  return sign
}

export function createSignWithSourceDetails(
  signWithDetails: SignWithDetailsToDB
): SignWithSourceDetails {
  const { meaningId, sign, mediaFile, author, signer, source } = signWithDetails

  const transaction = getDb().transaction(() => {
    const createdSign = createSign(sign)
    createMeaningSign({ signId: createdSign.id, meaningId })

    const createdMediaFile = createMediaFile(mediaFile)
    const createdAuthor = createAuthor(author)
    const createdSigner = createSigner(signer)

    const createdSource = createSource({
      ...source,
      mediaFileId: createdMediaFile.id,
      authorId: createdAuthor.id,
      signerId: createdSigner.id
    })

    createSourceSign({
      signId: createdSign.id,
      sourceId: createdSource.id,
      isMainSource: 1
    })

    return {
      ...createdSign,
      yearStart: createdSource.yearStart ?? null,
      yearEnd: createdSource.yearEnd ?? null,
      source: {
        ...createdSource,
        signer: createdSigner,
        author: createdAuthor,
        mediaFile: createdMediaFile
      }
    }
  })

  return transaction()
}

export function updateSign(meaningId: string, data: Partial<SignToDB>): Sign | undefined {
  const existing = findSignById(meaningId)
  if (!existing) return undefined

  const updated: Sign = { ...existing, ...data }
  getDb()
    .prepare(
      `
        UPDATE meaning
        SET notes = @notes
        WHERE id = @id
      `
    )
    .run(toSqlParams(updated))
  return updated
}

export function deleteSignById(id: string): void {
  getDb().prepare('DELETE FROM sign WHERE id = ?').run(id)
}

export function registerSignHandlers(): void {
  ipcMain.handle('sign:list', () => listAllSigns())
  ipcMain.handle('sign:find', (_, id: string) => findSignById(id))
  ipcMain.handle('sign:update', (_, singId: string, data: Partial<SignToDB>) =>
    updateSign(singId, data)
  )
  ipcMain.handle('sign:create', (_, data: SignWithDetailsToDB) => createSignWithSourceDetails(data))
  ipcMain.handle('sign:delete', (_, id: string) => deleteSignById(id))
}
