import { nanoid } from 'nanoid'
import { getDb } from '../db/client'
import { IReference, IReferenceAttached } from '../../../shared/models/reference.model'
import { fillMissingValues } from '../utils/helpers.functions'
import { referenceTemplate } from '../models/reference.model'
import { buildUpdateQuery } from '../utils/buildUpdateQuery'

// FIND
export function findReferenceById(referenceId: string): IReferenceAttached | undefined {
  return getDb().prepare('SELECT * FROM reference WHERE id = ?').get(referenceId) as
    | IReferenceAttached
    | undefined
}

// CREATE
export function createReference(data: IReference): IReferenceAttached {
  const reference: IReferenceAttached = { id: nanoid(), createdAt: Date.now(), ...data }
  getDb()
    .prepare(
      'INSERT INTO reference (id, createdAt, url, name, fullName, type, notes) VALUES (@id, @createdAt, @url, @name, @fullName, @type, @notes)'
    )
    .run(fillMissingValues<IReference>(reference, referenceTemplate))
  return reference
}

// UPDATE
export function updateReference(referenceId: string, data: Partial<IReference>): void {
  buildUpdateQuery('reference', referenceId, data as Record<string, unknown>)
}

// DELETE
export function deleteReference(referenceId: string): void {
  getDb().prepare('DELETE FROM reference WHERE id = ?').run(referenceId)
}
