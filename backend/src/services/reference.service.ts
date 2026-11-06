import { getDb } from "../db/client";
import { IReferenceAttached } from "../models/reference.model";

export function findReferenceById(referenceId: string): IReferenceAttached | undefined {
  return getDb().prepare('SELECT * FROM reference WHERE id = ?').get(referenceId) as
    | IReferenceAttached
    | undefined
}
