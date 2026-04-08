import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IEvidence, IEvidenceAttached } from '../../../shared/models/evidence.model'

export function findEvidenceById(id: string): IEvidenceAttached | undefined {
  return getDb().prepare('SELECT * FROM evidence WHERE id = ?').get(id) as
    | IEvidenceAttached
    | undefined
}

export function createEvidence(data: IEvidence): IEvidenceAttached {
  const file: IEvidenceAttached = { id: nanoid(), createdAt: Date.now(), fileUrl: data.fileUrl }
  getDb()
    .prepare('INSERT INTO evidence (id, createdAt, fileUrl) VALUES (@id, @createdAt, @fileUrl)')
    .run(file)
  return file
}
