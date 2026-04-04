export type MediaFileType = 'image' | 'video' | 'text'
export type FormType = 'add' | 'edit'

// WORD
export interface Word {
  id: string
  createdAt: string //ISO Date
  text: string
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
export type DefinitionsCategories =
  | 'autonomiczne'
  | 'czasownik'
  | 'liczebnik'
  | 'metatekst'
  | 'partykuła'
  | 'pragmatyczne'
  | 'przyimek'
  | 'przymiotnik'
  | 'przysłówek'
  | 'rzeczownik'
  | 'spójnik'
  | 'zaimek'

export interface DefinitionCategoryWithCount {
  name: DefinitionsCategories
  count: number
}

export interface Definition {
  id: string
  createdAt: string //ISO Date
  category: DefinitionsCategories
  text: string
  translation?: string
}

export type DefinitionToCreate = Omit<Definition, 'id' | 'createdAt'>
export interface DefinitionToDB extends DefinitionToCreate {
  signId: string
  wordId: string
}

export type DefinitionsCategoriesGrouped = {
  category: DefinitionsCategories
  definitions: Definition[]
}

// TAGS
export interface Tag {
  id: string
  createdAt: string //ISO Date
  name: string
}

export interface TagWord {
  tagId: string
  wordId: string
}

export type TagToDB = Omit<Tag, 'id' | 'createdAt'>
export type TagDropdownOption = Omit<Tag, 'createdAt'>

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

// TAG with WORD connector
export interface TagWord {
  tagId: string
  wordId: string
}

// WORD with SINGS count
export interface WordWithCount extends Word {
  signsCount: number
}

// WORD with TAGS
export interface WordWithTags extends Word {
  tags: Tag[]
}

export interface SignDetailsToDB {
  wordId: string
  definition: DefinitionToCreate
  sign: SignToDB
}

export interface YearStartEnd {
  yearStart: number | null
  yearEnd: number | null
}

// WORD with SIGNS and SOURCES and AUTHORS and MEDIAFILES
export interface SourceDetails extends Omit<Source, 'authorId' | 'mediaFileId'> {
  author: Author
  mediaFile: MediaFile
}

export interface SignDetails extends Sign, YearStartEnd {
  sourcesCount: number
  definitions: Definition[]
}
