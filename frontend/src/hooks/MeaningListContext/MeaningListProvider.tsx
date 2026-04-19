import { useState } from 'react'
import React from 'react'
import { MeaningListContext } from './MeaningListContext'
import type { IMeaningAttached, IMeaningDetails, IMeaningToDB } from '@src/models/meaning.model'
import { meaningApi } from '@src/services/meaning.api'
import type { ISignDetails } from '@src/models/sign.model'
import type { IWordAttached } from '@src/models/word.model'
import type { DropdownOption } from '@src/components/Form/Components/DropdownOptions'
import { addWordsToMeaning, applyWordChangesToState, deleteWordsFromMeaning, getWordChanges } from './wordToMeaningActions'

interface Props {
  children?: React.ReactNode
  sign: ISignDetails
}

export default function MeaningListProvider({ children, sign }: Props): React.JSX.Element {
  const [meaningList, setMeaningList] = useState<IMeaningDetails[]>(sign.meanings)
  const [meaningListLoading, setMeaningListLoading] = useState<boolean>(false)

  const addMeaning = (data: IMeaningToDB, words: DropdownOption[], closeForm: () => void): void => {
    setMeaningListLoading(true)
    meaningApi.create(sign.id, data)
      .then((result) =>
        addWordsToMeaning(result.id, words)
          .then((createdWords) => {
            setMeaningList((prev) => [...prev, { ...result, words: createdWords }])
          })
      )
      .catch((err) => { console.error(err); throw err })
      .finally(() => { setMeaningListLoading(false); closeForm() })
  }

  const editMeaning = (
    meaningId: string,
    meaningChanges: Partial<IMeaningAttached>,
    oldWords: DropdownOption[],
    newWords: DropdownOption[],
    closeForm: () => void
  ): void => {
    setMeaningListLoading(true)
    const { toAdd, toDelete } = getWordChanges(oldWords, newWords)

    Promise.all([
      Object.keys(meaningChanges).length > 0 ? meaningApi.update(meaningId, meaningChanges) : Promise.resolve(),
      addWordsToMeaning(meaningId, toAdd),
      deleteWordsFromMeaning(meaningId, toDelete)
    ])
      .then(([, addedWords]) => {
        setMeaningList((prev) => applyWordChangesToState(
          prev, meaningId, meaningChanges, addedWords as IWordAttached[], toDelete.map((w) => w.id)
        ))
      })
      .catch((err) => { console.error(err); throw err })
      .finally(() => { setMeaningListLoading(false); closeForm() })
  }

  const deleteMeaning = (deleteId: string): void => {
    setMeaningListLoading(true)
    meaningApi.delete(deleteId)
      .then(() => setMeaningList((prev) => prev.filter((m) => m.id !== deleteId)))
      .catch((err) => { console.error(err); throw err })
      .finally(() => setMeaningListLoading(false))
  }

  return (
    <MeaningListContext.Provider value={{ meaningList, meaningListLoading, addMeaning, editMeaning, deleteMeaning }}>
      {children}
    </MeaningListContext.Provider>
  )
}
