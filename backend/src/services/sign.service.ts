import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { findMediaById } from './media.service'
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
// function buildSignDetails(sign: ISignAttached): ISignDetails | undefined {
//   const media = findMediaById(sign.mediaId)
//   if (!media) return

//   const meanings = allMeaningsDetailsBySignId(sign.id)

//   return { ...sign, media, meanings }
// }

// FIND
function findSignById(signId: string): ISignAttached | undefined {
  return getDb().prepare('SELECT * FROM sign WHERE id = ?').get(signId) as ISignAttached | undefined
}

function listAllSigns(): ISignAttached[] | undefined {
  return getDb().prepare('SELECT * FROM sign').get() as ISignAttached[] | undefined
}

// LIST MAPPED
// export function getSignDetails(signId: string): ISignDetails | undefined {
//   const sign = findSignById(signId)
//   if (!sign) return
//   return buildSignDetails(sign)
// }

export function listAllSignsSimple(): ISignSimple[] {
  const transaction = getDb().transaction(() => {
    const signs = listAllSigns()
    if (!signs) return []

    return signs.flatMap((s) => {
      const details = buildSignSimple(s)
      return details ? [details] : []
    })
  })
  return transaction()
}

// CREATE
function createSign(data: ISignDetailsToDB, mediaId: string): ISignAttached {
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

// export function createSignWithMedia(data: ISignDetailsToDB): ISignWithMedia {
//   const transaction = getDb().transaction(() => {
//     const media = findMediaByVideoUrl(data.media.videoUrl) ?? createMedia(data.media)
//     const sign = createSign(data, media.id)

//     return {
//       ...sign,
//       media
//     } satisfies ISignWithMedia
//   })
//   return transaction()
// }

// UPDATE
export function updateSign(signId: string, data: Partial<ISign>): void {
  getDb()
    .prepare(
      `UPDATE sign
       SET notes = @notes, mediaId = @mediaId
       WHERE id = @id`
    )
    .run({ id: signId, ...data })
}

// DELETE
export function deleteSign(signId: string): void {
  getDb().prepare('DELETE FROM sign WHERE id = ?').run(signId)
}
