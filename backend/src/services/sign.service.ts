import { getDb } from '../db/client'
import {
  ISignAttached,
  ISignDetailed,
  ISignSimple,
} from '../models/sign.model'
import { findMeaningsDetailedBySignId } from './meaning.service'
import { findMediaBySignId } from './media.service'
import { listRegionsNamesBySignId } from './region.service'
import { getStartEndYearBySignId } from './source.service'
import { listWordsNamesBySignId } from './word.service'

// FIND
function findSignByNumber(signNumber: string): ISignAttached {
  return getDb().prepare('SELECT * FROM sign WHERE uniqueNumber = ?').get(signNumber) as ISignAttached
}

function listAllSigns(): ISignAttached[] {
  return getDb().prepare('SELECT * FROM sign ORDER BY uniqueNumber DESC').all() as ISignAttached[]
}

// MAP SIMPLE
function buildSignSimple(sign: ISignAttached): ISignSimple | undefined {
  const media = findMediaBySignId(sign.id)
  const regions = listRegionsNamesBySignId(sign.id)
  const years = getStartEndYearBySignId(sign.id)
  const words = listWordsNamesBySignId(sign.id)
  const uniqueNumber = String(sign.uniqueNumber)

  return { ...sign, regions, years, words, media, uniqueNumber }
}

// MAP DETAILED
export function getSignDetails(signNumber: string): ISignDetailed {
  const sign = findSignByNumber(signNumber)
  const meanings = findMeaningsDetailedBySignId(sign.id)
  const media = findMediaBySignId(sign.id)

  return {...sign, meanings, media}
}

// LIST MAPPED SIMPLE
export function listAllSignsSimple(): ISignSimple[] {
  const result = getDb().transaction(() => {
    return listAllSigns().flatMap((s) => {
      const simple = buildSignSimple(s)
      return simple ? [simple] : []
    })
  })
  
  return result()
}