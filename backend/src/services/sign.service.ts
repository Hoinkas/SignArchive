import { getDb } from '../db/client'
import {
  ISignAttached,
  ISignSimple,
} from '../models/sign.model'
import { findMediaBySignId } from './media.service'
import { listRegionsNamesBySignId } from './region.service'
import { getStartEndYearBySignId } from './source.service'
import { listWordsNamesBySignId } from './word.service'

// MAP SIMPLE
function buildSignSimple(sign: ISignAttached): ISignSimple | undefined {
  const media = findMediaBySignId(sign.id)
  const regions = listRegionsNamesBySignId(sign.id)
  const years = getStartEndYearBySignId(sign.id)
  const words = listWordsNamesBySignId(sign.id)
  const uniqueNumber = String(sign.uniqueNumber)

  return { ...sign, regions, years, words, media, uniqueNumber }
}

// FIND
function listAllSigns(): ISignAttached[] {
  return getDb().prepare('SELECT * FROM sign ORDER BY uniqueNumber DESC').all() as ISignAttached[]
}

// LIST MAPPED
export function listAllSignsSimple(): ISignSimple[] {
  const result = getDb().transaction(() => {
    return listAllSigns().flatMap((s) => {
      const simple = buildSignSimple(s)
      return simple ? [simple] : []
    })
  })
  
  return result()
}