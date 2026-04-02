export type MediaFileType = 'image' | 'video' | 'text'
export type FormType = 'add' | 'edit'

// WORD
export interface Word {
  id: string
  createdAt: string //ISO Date
  text: string
  tags?: string[]
}

export type WordToDB = Omit<Word, 'id' | 'createdAt'>

// SIGN
export interface Sign {
  id: string
  createdAt: string //ISO Date
  file: SignFile
  notes?: string
}

export interface SignFile {
  path: string
  originalName: string
  mimeType: string
  size: number
}

export interface SignToDB extends Omit<Sign, 'id' | 'createdAt' | 'file'> {
  file: string // JSON.stringify(SignFile)
}

//AUTHOR
export interface Author {
  id: string
  createdAt: string //ISO Date
  name: string
}

export type AuthorToDB = Omit<Author, 'id' | 'createdAt'>

//MEDIAFILE
export interface MediaFile {
  id: string
  createdAt: string //ISO Date
  fileUrl: string
}

export type MediaFileToDB = Omit<MediaFile, 'id' | 'createdAt'>

//SOURCE
export interface Source {
  id: string
  createdAt: string //ISO Date
  authorId: string
  mediaFileId: string
  region?: string
  yearStart?: number
  yearEnd?: number
  notes?: string
}

export type SourceToDB = Omit<Source, 'id' | 'createdAt'>
export type SourceToCreate = Omit<SourceToDB, 'authorId' | 'mediaFileId'>

export interface SourceWithDetailsToDB {
  source: SourceToCreate
  mediaFile: MediaFileToDB
  author: AuthorToDB
}

export interface SourceWithDetailsToCreate extends SourceWithDetailsToDB {
  signId: string
  wordId: string
}

//DEFINITION
export interface Definition {
  id: string
  createdAt: string //ISO Date
  category: string
  text: string
  translation?: string
}

export type DefinitionToDB = Omit<Definition, 'id' | 'createdAt'>

// DEFINITION with SIGN with WORD connector
export interface DefinitionSignWord {
  definitionId: string
  signId: string
  wordId: string
}

// SOURCE with SIGN with WORD connector
export interface SourceSignWord {
  sourceId: string
  signId: string
  wordId: string
}

// WORD with SINGS count
export interface WordWithCounts extends Word {
  signsCount: number
}

export interface SignWithDetailsToDB {
  wordId: string
  definition: DefinitionToDB
  sign: SignToDB
}

export interface YearStartEnd {
  yearStart: number | null
  yearEnd: number | null
}

// WORD with SIGNS and SOURCES and AUTHORS and MEDIAFILES
export interface SourceWithDetails extends Omit<Source, 'authorId' | 'mediaFileId'> {
  author: Author
  mediaFile: MediaFile
}

export interface SignWithDetails extends Sign, YearStartEnd {
  sourcesCount: number
  definitions: Definition[]
}

export interface WordWithSignsDetails extends Word {
  signs: SignWithDetails[]
}
