import { useState } from 'react'
import React from 'react'
import {
  SignWithDetails,
  SourceWithDetails,
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
  const [sources, setSources] = useState<SourceWithDetails[]>([])

  const changeSourcesPanelSign = (data: SignWithDetails): void => {
    if (!word) return
    setSourcesPanelSign(data)
    window.api.source.list(data.id, word.id).then(setSources)
  }

  const closeSourcesPanelSign = (): void => {
    setSourcesPanelSign(null)
  }

  const addSource = (data: SourceWithDetailsToDB, closeForm: () => void): void => {
    if (!sourcesPanelSign || !word) return

    const sourceWithDetails: SourceWithDetailsToCreate = {
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
    updatedSource: Partial<SourceWithDetailsToDB>,
    closeForm: () => void
  ): void => {
    window.api.source.update(sourceId, updatedSource).then((result) => {
      if (!result) return
      setSources((prevState) =>
        prevState.map((s) => (s.id === result.id ? { ...s, ...result } : s))
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
        changeSourcesPanelSign,
        closeSourcesPanelSign
      }}
    >
      {children}
    </SourcesContext.Provider>
  )
}
