export type FormType = 'add' | 'edit'

// WORD
export interface Word {
  id: string
  createdAt: number
  text: string
}

export interface WordToDB {
  text: string
  tagIds?: string[]
}

export interface WordWithCount extends Word {
  signsCount: number
}

export interface WordWithCountCategories extends WordWithCount {
  categories: Tag[]
  regions: string[]
}

// SIGN
export interface SignFile {
  url: string
  name: string
  mediaType: string
}

export interface Sign {
  id: string
  createdAt: number
  file: SignFile
  notes?: string
}

export interface SignToDB {
  fileUrl: string
  notes?: string
}

export interface SignDetails extends Sign {
  yearStart: number | null
  yearEnd: number | null
  sourcesCount: number
  definitions: Definition[]
  regions: string[]
}

export interface SignDetailsToDB {
  wordId: string
  definition: DefinitionToCreate
  sign: SignFile
  notes?: string
}

// AUTHOR
export interface Author {
  id: string
  createdAt: number
  name: string
}

export type AuthorToDB = Omit<Author, 'id' | 'createdAt'>

// MEDIAFILE
export interface MediaFile {
  id: string
  createdAt: number
  fileUrl: string
}

export type MediaFileToDB = Omit<MediaFile, 'id' | 'createdAt'>

// SOURCE
export interface Source {
  id: string
  createdAt: number
  authorId: string
  mediaFileId: string
  region?: string
  yearStart?: number
  yearEnd?: number
  notes?: string
}

export type SourceToCreate = Omit<Source, 'id' | 'createdAt' | 'authorId' | 'mediaFileId'>

export interface SourceWithDetailsToDB {
  source: SourceToCreate
  mediaFile: MediaFileToDB
  author: AuthorToDB
}

export interface SourceWithDetailsToCreate extends SourceWithDetailsToDB {
  signId: string
  wordId: string
}

export interface SourceDetails extends Omit<Source, 'authorId' | 'mediaFileId'> {
  author: Author
  mediaFile: MediaFile
}

// DEFINITION
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

export interface Definition {
  id: string
  createdAt: number
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

export interface DefinitionCategoryWithCount {
  name: DefinitionsCategories
  count: number
}

// TAG
export interface Tag {
  id: string
  createdAt: number
  name: string
}

export type TagToDB = Omit<Tag, 'id' | 'createdAt'>
export type TagDropdownOption = Omit<Tag, 'createdAt'>

export interface TagWord {
  tagId: string
  wordId: string
}

// HELPERS
export interface YearStartEnd {
  yearStart: number | null
  yearEnd: number | null
}

export interface YearsRegions extends YearStartEnd {
  regions: string[]
}
