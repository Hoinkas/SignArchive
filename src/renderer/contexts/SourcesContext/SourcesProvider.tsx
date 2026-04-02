import { useState } from 'react'
import React from 'react'
import {
  SignWithDetails,
  SourceWithAuthorMediaFile,
  SourceWithDetailsSignIdWordIdToDB,
  SourceWithDetailsToCreate,
  SourceWithDetailsToDB
} from '@shared/types'
import { SourcesContext } from './SourcesContext'
import { useWord } from '@contexts/WordContext/useWord'

interface Props {
  children?: React.ReactNode
}

export default function SourcesProvider({ children }: Props): React.JSX.Element {
  const { word } = useWord()
  const [sourcesPanelSign, setSourcesPanelSign] = useState<SignWithDetails | null>(null)
  const [sources, setSources] = useState<SourceWithAuthorMediaFile[]>([])

  const changeSourcesPanelSign = (data: SignWithDetails): void => {
    if (!word) return
    setSourcesPanelSign(data)
    window.api.source.list(data.id, word.id).then(setSources)
  }

  const addSource = (data: SourceWithDetailsToDB, closeForm: () => void): void => {
    if (!sourcesPanelSign || !word) return

    const sourceWithDetails: SourceWithDetailsSignIdWordIdToDB = {
      ...data,
      signId: sourcesPanelSign?.id,
      wordId: word.id
    }

    window.api.source.create(sourceWithDetails).then((result) => {
      setSources((prevState) => [...prevState, result])
      closeForm()
    })
  }

  const editSource = (
    sourceId: string,
    updatedSource: Partial<SourceWithDetailsToCreate>,
    closeForm: () => void
  ): void => {
    window.api.source.update(sourceId, updatedSource).then(() => {
      setSources((prevState) =>
        prevState.map((s) => (s.id === sourceId ? { ...s, updatedSource } : s))
      )
      closeForm()
    })
  }

  const deleteSource = (deleteId: string): void => {
    window.api.source.delete(deleteId).then(() => {
      setSources((prevState) => prevState.filter((s) => s.id !== deleteId))
    })
  }

  return (
    <SourcesContext.Provider
      value={{
        sources,
        addSource,
        editSource,
        deleteSource,
        sourcesPanelSign,
        changeSourcesPanelSign
      }}
    >
      {children}
    </SourcesContext.Provider>
  )
}
