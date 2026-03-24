export type MediaFileType = 'png' | 'img' | 'gif' | 'mp4' | 'mov' | 'flv'
export type RelationType = 'duplicate' | 'variant' | 'homonym'
export type DeafnessType = 'deaf' | 'hearing' | 'hardofhearing' | 'coda'
export type SignType = 'PJM' | 'SJM' | 'both'
export type SignStatus = 'draft' | 'published' | 'archived' | 'disputed'

export const SourceReliability = {
  1: 'anonimowy wpis, brak źródła',
  2: 'słyszący tłumacz lub materiał wtórny',
  3: 'głuchy użytkownik języka, jedno źródło',
  4: 'wielu głuchych native signerów, potwierdzone wielokrotnie'
} as const

export type SourceReliabilityLevel = keyof typeof SourceReliability

export const UsageFrequency = {
  1: 'jednostkowe, zaobserwowane raz',
  2: 'regionalne, znane w konkretnej społeczności',
  3: 'szersze użycie, kilka regionów lub pokoleń',
  4: 'ogólnopolskie, powszechnie rozumiane'
} as const

export type UsageFrequencyLevel = keyof typeof UsageFrequency

export interface Sign {
  id: string
  createdAt: string //ISO Date
  notes?: string
  status: SignStatus
  handShape?: string
  location?: string
  movement?: string
  phonologyExtended?: string
  type?: SignType
}

export interface Word {
  id: string
  createdAt: string //ISO Date
  text: string
  definition?: string
  parentWordId?: string
  aliases: string[]
  tags: string[]
}

export interface Signer {
  id: string
  createdAt: string //ISO Date
  name: string
  surname: string
  deafnessType?: DeafnessType
}

export interface Source {
  id: string
  createdAt: string //ISO Date
  name: string
  onlineUrl?: string
  region?: string
}

export interface MediaFile {
  id: string
  createdAt: string //ISO Date
  fileType: string
  filePath: string
  onlineUrl?: string
  signId: string
  signerId?: string
  sourceId: string
  year?: number
}

export interface Meaning {
  id: string
  createdAt: string //ISO Date
  signId: string
  wordId: string
  context?: string
  region?: string
  yearStart?: number
  yearEnd?: number
  sourceReliability: SourceReliabilityLevel
  usageFrequency: UsageFrequencyLevel
  notes?: string
}

//SIGN - SIGN connection table
export interface SignRelation {
  createdAt: string //ISO Date
  tailSignId: string
  headSignId: string
  relationType: RelationType
}

//WORD + SIGN + MEDIAFILE
export interface WordWithSignAndMedia {
  word: Word
  sign: Sign
  mediaFile: MediaFile
}

// WORD WITH SIGN COUNT
export interface WordWithSignCount extends Word {
  signCount: number
}

//ALL DETAILS FOR WORD
export interface SignWithSourceSignerMediaFile {
  sign: Sign
  source?: Source
  mediaFile: MediaFile
  signer?: Signer
}

export interface MeaningWithSigns {
  meaning: Meaning
  signs: SignWithSourceSignerMediaFile[]
}

export interface WordWithDetails {
  word: Word
  meanings: MeaningWithSigns[]
}
