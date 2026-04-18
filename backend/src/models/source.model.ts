import type { IAuthor, IAuthorAttached } from './author.model'
import type { IBaseModelAttached } from './base.interface'
import type { IReference, IReferenceAttached } from './evidence.model'

export interface ISource {
  authorId: string
  evidenceId: string
  region?: string
  yearStart?: number
  yearEnd?: number
  notes?: string
  translations?: string
}

export type ISourceToDB = Omit<ISource, 'authorId' | 'evidenceId'>

export interface ISourceWithDetailsToDB {
  source: ISourceToDB
  evidence: IReference
  author: IAuthor
}

export interface ISourceWithDetailsToCreate extends ISourceWithDetailsToDB {
  signId: string
  wordId: string
}

export interface ISourceDetails
  extends Omit<ISource, 'authorId' | 'evidenceId'>, IBaseModelAttached {
  author: IAuthorAttached
  evidence: IReferenceAttached
}

export type ISourceAttached = ISource & IBaseModelAttached

export interface ISourceSignWord {
  sourceId: string
  signId: string
  wordId: string
}
