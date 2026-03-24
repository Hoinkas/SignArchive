import signsFromExcel from '../main/db/signs.json'
import type { Sign, Signer, MediaFile, Source, Word, Meaning } from '@shared/types'

export interface SignFromExcel {
  Id: number
  Sign: string
  Person_signing: string
  Date_of_sign: string
  Category: string
  Local_Url: string
  Online_Url: string
  Region: string
  Description: string
  Explaination: string
  Source_of_clip: string
  Date_of_clip: string
  Image: string
  Date_Created: string
  Date_Modified: string
  Is_SJM: boolean | string
}

export interface DatabaseRecord {
  sign: Omit<Sign, 'id' | 'createdAt'>
  word: Omit<Word, 'id' | 'createdAt'>
  mediaFile: Omit<MediaFile, 'id' | 'createdAt' | 'signId'>
  source: Omit<Source, 'id' | 'createdAt'>
  signer: Omit<Signer, 'id' | 'createdAt'>
  meaning: Omit<Meaning, 'id' | 'createdAt' | 'signId' | 'wordId'>
}

export function mapSignsFromExcelToDatabase(): DatabaseRecord[] {
  return (signsFromExcel as SignFromExcel[]).map(mapSignFromExcelToDatabase)
}

export function mapSignFromExcelToDatabase(row: SignFromExcel): DatabaseRecord {
  const isSJM = row.Is_SJM === true || row.Is_SJM === 'true' || row.Is_SJM === '1'

  const [yearStartRaw, yearEndRaw] = (row.Date_of_sign ?? '').split('-')
  const yearStart = yearStartRaw ? parseInt(yearStartRaw) : undefined
  const yearEnd = yearEndRaw ? parseInt(yearEndRaw) : undefined

  const [name, ...surnameParts] = (row.Person_signing ?? '').split(' ')
  const surname = surnameParts.join(' ')

  const sign: DatabaseRecord['sign'] = {
    status: 'draft',
    notes: row.Description || undefined,
    type: isSJM ? 'SJM' : 'PJM',
    handShape: undefined,
    location: undefined,
    movement: undefined,
    phonologyExtended: undefined
  }

  const word: DatabaseRecord['word'] = {
    text: titleCase(row.Sign?.trim() ?? ''),
    definition: undefined,
    parentWordId: undefined,
    aliases: [],
    tags: row.Category ? [row.Category] : []
  }

  const rawPath = row.Local_Url || row.Image || ''
  const filePath = rawPath.startsWith('file://')
    ? decodeURIComponent(rawPath.replace('file://', ''))
    : rawPath

  const mediaFile: DatabaseRecord['mediaFile'] = {
    fileType: filePath.split('.').pop() ?? ('txt' as MediaFile['fileType']),
    filePath,
    onlineUrl: row.Online_Url || undefined,
    signerId: undefined,
    sourceId: undefined,
    year: yearStart
  }

  const source: DatabaseRecord['source'] = {
    name: row.Source_of_clip || 'nieznane',
    onlineUrl: undefined,
    region: row.Region || undefined
  }

  const signer: DatabaseRecord['signer'] = {
    name: name ?? '',
    surname: surname ?? '',
    deafnessType: undefined
  }

  const meaning: DatabaseRecord['meaning'] = {
    context: row.Explaination || undefined,
    region: row.Region || undefined,
    yearStart,
    yearEnd,
    sourceReliability: 2,
    usageFrequency: 2,
    notes: undefined
  }

  return { sign, word, mediaFile, source, signer, meaning }
}

function titleCase(str: string): string {
  return str.length === 0 ? str : str[0].toUpperCase() + str.slice(1).toLowerCase()
}
