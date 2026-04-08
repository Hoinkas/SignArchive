import type { IBaseModelAttached } from './base.interface'
import { IDefinition, IDefinitionAttached } from './definition.model'
import { IYearStartEnd } from './yearStartEnd.model'

export interface ISignFile {
  url: string
  name: string
  mediaType: string
}

export interface ISign {
  file: ISignFile
  notes?: string
}

export interface ISignToDB extends Omit<ISign, 'file'> {
  fileUrl: string
}

export interface ISignDetails extends ISign, IBaseModelAttached, IYearStartEnd {
  sourcesCount: number
  definitions: IDefinitionAttached[]
  regions: string[]
}

export interface ISignDetailsToDB {
  wordId: string
  definition: IDefinition
  sign: ISignFile
  notes?: string
}

export type ISignAttached = ISign & IBaseModelAttached
