import { useState } from 'react'
import React from 'react'
import { MeaningListContext } from './MeaningListContext'
import type { IMeaningAttached, IMeaningDetails, IMeaningToDB } from '@src/models/meaning.model'
import { meaningApi } from '@src/services/meaning.api'
import type { ISignDetails } from '@src/models/sign.model'

interface Props {
  children?: React.ReactNode
  sign: ISignDetails
}

export default function MeaningListProvider({ children, sign }: Props): React.JSX.Element {
  const [meaningList, setMeaningList] = useState<IMeaningDetails[]>(sign.meanings)
  const [meaningListLoading, setMeaningListLoading] = useState<boolean>(false)

  const addMeaning = (data: IMeaningToDB, closeForm: () => void):void => {
    setMeaningListLoading(true)
    meaningApi.create(sign.id, data).then((result) => {
      setMeaningList((prevState) => [...prevState, result])
      closeForm()
    }).catch((err) => {
      console.error(err)
      throw err
    })
    setMeaningListLoading(false)
  }

  const editMeaning = (meaningId: string, meaningChanges: Partial<IMeaningAttached>, closeForm: () => void): void => {
    setMeaningListLoading(true)
    meaningApi.update(meaningId, meaningChanges)
      .then(() => {
        setMeaningList((prev) => prev.map((m) => (
          m.id === meaningId ? { ...m, ...meaningChanges } : m
        )))
        closeForm()
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
    setMeaningListLoading(false)
    }

  const deleteMeaning = (deleteId: string): void => {
    setMeaningListLoading(true)
    meaningApi.delete(deleteId)
      .then(() => {
        setMeaningList((prev) => prev.filter((m) => m.id !== deleteId))
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
    setMeaningListLoading(false)
  }

  return (
    <MeaningListContext.Provider value={{ meaningList, meaningListLoading, addMeaning, editMeaning, deleteMeaning }}>
      {children}
    </MeaningListContext.Provider>
  )
}
