import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { createMedia, findMediaById, findMediaByVideoUrl, updateMedia } from './media.service'
import { fillMissingValues } from '../utils/helpers.functions'
import {
  ISign,
  ISignAttached,
  ISignDetails,
  ISignDetailsToDB,
  ISignWithMedia,
  signTemplate
} from '../models/sign.model'
import { listMeaningsDetailsBySignId } from './meaning.service'

// FIND
export function findSignById(id: string): ISignAttached | undefined {
  const row = getDb().prepare('SELECT * FROM sign WHERE id = ?').get(id)
  return row ? (row as ISignAttached) : undefined
}

function buildSignDetails(sign: ISignAttached): ISignDetails | undefined {
  const media = findMediaById(sign.mediaId)
  if (!media) return

  const meanings = listMeaningsDetailsBySignId(sign.id)

  return { ...sign, media, meanings }
}

export function listAllSignsDetailed(): ISignDetails[] {
  const transaction = getDb().transaction(() => {
    const rows = getDb().prepare('SELECT * FROM sign').get() as ISignAttached[]

    return rows.flatMap((s) => {
      const details = buildSignDetails(s)
      return details ? [details] : []
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

export function createSignWithMedia(data: ISignDetailsToDB): ISignWithMedia {
  const transaction = getDb().transaction(() => {
    const media = findMediaByVideoUrl(data.media.videoUrl) ?? createMedia(data.media)
    const sign = createSign(data, media.id)

    return {
      ...sign,
      media
    } satisfies ISignWithMedia
  })
  return transaction()
}

// UPDATE
export function updateSign(signId: string, data: ISignDetails): ISignDetails | undefined {
  const existing = findSignById(signId)
  if (!existing) return

  const media = updateMedia(data.media.id, data.media) || createMedia(data.media)

  const updatedSign: ISignAttached = {
    ...existing,
    ...data,
    mediaId: media.id
  }

  getDb()
    .prepare(
      `UPDATE sign
       SET notes = @notes, mediaId = @mediaId
       WHERE id = @id`
    )
    .run(updatedSign)

  return buildSignDetails(updatedSign)
}

// DELETE
export function deleteSign(signId: string): void {
  getDb().prepare('DELETE FROM sign WHERE id = ?').run(signId)
}
