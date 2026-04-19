import type { DropdownOption } from '@src/components/Form/Components/DropdownOptions'
import type { IMeaningAttached, IMeaningDetails } from '@src/models/meaning.model'
import type { IWordAttached } from '@src/models/word.model'
import { wordApi } from '@src/services/word.api'

export function addWordsToMeaning(
  meaningId: string,
  words: DropdownOption[]
): Promise<IWordAttached[]> {
  return Promise.all(words.map((w) => wordApi.create(meaningId, { name: w.label })))
}

export function deleteWordsFromMeaning(
  meaningId: string,
  words: DropdownOption[]
): Promise<void[]> {
  return Promise.all(words.map((w) => wordApi.delete(meaningId, w.id)))
}

export function getWordChanges(oldWords: DropdownOption[], newWords: DropdownOption[]) {
  return {
    toAdd: newWords.filter((nw) => !oldWords.some((ow) => ow.label === nw.label)),
    toDelete: oldWords.filter((ow) => !newWords.some((nw) => ow.label === nw.label))
  }
}

export function applyWordChangesToState(
  prev: IMeaningDetails[],
  meaningId: string,
  meaningChanges: Partial<IMeaningAttached>,
  addedWords: IWordAttached[],
  deletedIds: string[]
): IMeaningDetails[] {
  return prev.map((m) =>
    m.id !== meaningId
      ? m
      : {
          ...m,
          ...meaningChanges,
          words: [...m.words.filter((w) => !deletedIds.includes(w.id)), ...addedWords]
        }
  )
}
