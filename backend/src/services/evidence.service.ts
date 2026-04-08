import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IEvidence, IEvidenceAttached } from '../../../shared/models/evidence.model'

export function findEvidenceById(id: string): IEvidenceAttached | undefined {
  return getDb().prepare('SELECT * FROM evidence WHERE id = ?').get(id) as
    | IEvidenceAttached
    | undefined
}

export function createEvidence(data: IEvidence): IEvidenceAttached {
  const file: IEvidenceAttached = { id: nanoid(), createdAt: Date.now(), ...data }
  getDb()
    .prepare(
      'INSERT INTO evidence (id, createdAt, url, name, fullName) VALUES (@id, @createdAt, @url, @name, @fullName)'
    )
    .run(file)
  return file
}
