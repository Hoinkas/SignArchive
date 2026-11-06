import { IMeaningAttached, IMeaningDetailed } from "@signarchive/shared/models/meaning.model";
import { getDb } from "../db/client";
import { getDetailedSourceByMeaningId } from "./source.service";
import { listWordsNamesByMeaningId } from "./word.service";

//FIND SIMPLE
export function findMeaningsBySignId(signId: string): IMeaningAttached[] {
  return getDb().prepare('SELECT * FROM meaning WHERE signId = ?').all(signId) as IMeaningAttached[]
}

//FIND DETAILED
export function findMeaningsDetailedBySignId(signId: string): IMeaningDetailed[] {
  const meanings = findMeaningsBySignId(signId)
  const detailedMeanings = meanings.map((m) => mapSimpleMeaningToDetailed(m))
  return detailedMeanings
}

//MAP SIMPLE TO DETAILED
function mapSimpleMeaningToDetailed(meaning: IMeaningAttached): IMeaningDetailed {
  const words = listWordsNamesByMeaningId(meaning.id)
  const sources = getDetailedSourceByMeaningId(meaning.id)

  return {...meaning, words, sources}
}