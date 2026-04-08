import { IAuthor, IAuthorAttached } from './author.model';
import { IBaseModelAttached } from './base.interface';
import { IMediaFile, IMediaFileAttached } from './mediaFile.model';

export interface ISource {
  authorId: string
  mediaFileId: string
  region?: string
  yearStart?: number
  yearEnd?: number
  notes?: string
}

export type ISourceToCreate = Omit<ISource, 'authorId' | 'mediaFileId'>

export interface ISourceWithDetailsToDB {
  source: ISourceToCreate
  mediaFile: IMediaFile
  author: IAuthor
}

export interface ISourceWithDetailsToCreate extends ISourceWithDetailsToDB {
  signId: string
  wordId: string
}

export interface ISourceDetails extends Omit<ISource, 'authorId' | 'mediaFileId'>, IBaseModelAttached {
  author: IAuthorAttached
  mediaFile: IMediaFileAttached
}

export type ISourceAttached = ISource & IBaseModelAttached

export interface ISourceSignWord {
  sourceId: string
  signId: string
  wordId: string
}