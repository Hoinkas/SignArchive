import { IReferenceAttached } from "@signarchive/shared/models/reference.model";
import { getDb } from "../db/client";

export function findReferenceById(referenceId: string): IReferenceAttached | undefined {
  return getDb().prepare('SELECT * FROM reference WHERE id = ?').get(referenceId) as
    | IReferenceAttached
    | undefined
}
