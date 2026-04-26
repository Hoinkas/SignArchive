import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { deleteMedia, findMediaById } from './media.service'
import { fillMissingValues } from '../utils/helpers.functions'
import {
  ISign,
  ISignAttached,
  ISignDetails,
  ISignDetailsToDB,
  ISignSimple,
  signTemplate
} from '../models/sign.model'
import { allMeaningsDetailsBySignId, countMeaningsBySingId } from './meaning.service'
import { listRegionsNamesBySignId } from './region.service'
import { getStartEndYearBySignId } from './source.service'
import { listWordsNamesBySignId } from './word.service'
import { buildUpdateQuery } from '../utils/buildUpdateQuery'

// MAP SIMPLE
function buildSignSimple(sign: ISignAttached): ISignSimple | undefined {
  const media = findMediaById(sign.mediaId)
  if (!media) return

  const meaningsCount = countMeaningsBySingId(sign.id)
  const regions = listRegionsNamesBySignId(sign.id)
  const years = getStartEndYearBySignId(sign.id)
  const words = listWordsNamesBySignId(sign.id)

  return { ...sign, meaningsCount, regions, years, words, media }
}

// MAP DETAILS
function buildSignDetails(sign: ISignAttached): ISignDetails | undefined {
  const media = findMediaById(sign.mediaId)
  if (!media) return

  const meanings = allMeaningsDetailsBySignId(sign.id)

  return { ...sign, media, meanings }
}

// FIND
function findSignById(signId: string): ISignAttached | undefined {
  return getDb().prepare('SELECT * FROM sign WHERE id = ?').get(signId) as ISignAttached | undefined
}

function listAllSigns(): ISignAttached[] {
  return getDb().prepare('SELECT * FROM sign ORDER BY createdAt DESC').all() as ISignAttached[]
}

export function getSignSimple(signId: string): ISignSimple | undefined {
  const sign = findSignById(signId)
  if (!sign) return
  return buildSignSimple(sign)
}

// LIST MAPPED
export function getSignDetails(signId: string): ISignDetails | undefined {
  const sign = findSignById(signId)
  if (!sign) return
  return buildSignDetails(sign)
}

export function listAllSignsSimple(): ISignSimple[] {
  const transaction = getDb().transaction(() => {
    return listAllSigns().flatMap((s) => {
      const simple = buildSignSimple(s)
      return simple ? [simple] : []
    })
  })
  return transaction()
}

// CREATE
export function createSign(data: ISignDetailsToDB, mediaId: string): ISignAttached {
  const sign: ISignAttached = {
    id: nanoid(),
    createdAt: Date.now(),
    ...data,
    mediaId
  }

  getDb()
    .prepare(
      'INSERT INTO sign (id, createdAt, mediaId, notes) VALUES (@id, @createdAt, @mediaId, @notes)'
    )
    .run(fillMissingValues<ISign>(sign, signTemplate))

  return sign
}

// UPDATE
export function updateSign(signId: string, data: Partial<ISign>): void {
  buildUpdateQuery('sign', signId, data as Record<string, unknown>)
}

// DELETE
export function deleteSign(signId: string): void {
  const sign = findSignById(signId)
  if (!sign) return
  getDb().prepare('DELETE FROM sign WHERE id = ?').run(signId)
  deleteMedia(sign.mediaId)
}
