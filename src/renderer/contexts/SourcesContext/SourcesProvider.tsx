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
import { useSigns } from '@contexts/SignsContext/useSigns'

interface Props {
  children?: React.ReactNode
}

export default function SourcesProvider({ children }: Props): React.JSX.Element {
  const { word } = useWord()
  const { changeSourcesCountInSign } = useSigns()
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
      changeSourcesCountInSign('add', result.id)
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
      if (!sourcesPanelSign) return
      setSources((prevState) => prevState.filter((s) => s.id !== deleteId))
      changeSourcesCountInSign('remove', sourcesPanelSign.id)
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
