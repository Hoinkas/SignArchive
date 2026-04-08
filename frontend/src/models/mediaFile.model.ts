import { IBaseModelAttached } from './base.interface';

export interface IMediaFile {
  fileUrl: string
}

export type IMediaFileAttached = IMediaFile & IBaseModelAttached