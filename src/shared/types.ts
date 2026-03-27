export type MediaFileType = 'png' | 'img' | 'mp4' | 'txt'
export type FormType = 'add' | 'edit'

export interface Word {
  id: string
  createdAt: string //ISO Date
  text: string
  definition?: string
  tags?: string[]
}

export type WordToDB = Omit<Word, 'id' | 'createdAt'>

export interface Meaning {
  id: string
  createdAt: string //ISO Date
  wordId: string
  context?: string
  notes?: string
}

export type MeaningToDB = Omit<Meaning, 'id' | 'createdAt'>

export interface Sign {
  id: string
  createdAt: string //ISO Date
}

export type SignToDB = Omit<Sign, 'id' | 'createdAt'>

export interface Signer {
  id: string
  createdAt: string //ISO Date
  name: string
  surname: string
}

export type SignerToDB = Omit<Signer, 'id' | 'createdAt'>

export interface Author {
  id: string
  createdAt: string //ISO Date
  name: string
}

export type AuthorToDB = Omit<Author, 'id' | 'createdAt'>

export interface MediaFile {
  id: string
  createdAt: string //ISO Date
  fileType: string
  filePath: string
  onlineUrl?: string
}

export type MediaFileToDB = Omit<MediaFile, 'id' | 'createdAt'>

export interface Source {
  id: string
  createdAt: string //ISO Date
  signerId: string
  authorId: string
  mediaFieldId: string
  region?: string
  yearStart?: number
  yearEnd?: number
  notes: string
}

export type SourceToDB = Omit<Source, 'id' | 'createdAt'>

//MEANING - SIGN connection table
export interface MeaningSign {
  meaningId: string
  signId: string
}

//SOURCE - SIGN connection table
export interface SourceSign {
  sourceId: string
  signId: string
}

// WORD with MEANINGS and SINGS count
export interface WordWithCounts extends Word {
  meaningsCount: number
  signsCount: number
}

// WORD with MEANINGS and SIGNS and SOURCES and SIGNERS and AUTHORS and MEDIAFILES
export interface SourceWithSignerAuthorMediaFile extends Omit<
  Source,
  'signerId' | 'authorId' | 'mediaFileId'
> {
  signer?: Signer
  author?: Author
  mediaFile?: MediaFile
}

export interface SignWithSourcesDetails extends Sign {
  sources: SourceWithSignerAuthorMediaFile[]
}

export interface MeaningWithSignsDetails extends Meaning {
  signs: SignWithSourcesDetails[]
}

export interface WordWithMeaningsDetails extends Word {
  meanings: MeaningWithSignsDetails[]
}
