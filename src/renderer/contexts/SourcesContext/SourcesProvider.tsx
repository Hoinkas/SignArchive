import { useState } from 'react'
import React from 'react'
import {
  SignDetails,
  SourceDetails,
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
  const { updateSignSource } = useSigns()
  const [sourcesPanelSign, setSourcesPanelSign] = useState<SignDetails | null>(null)
  const [sources, setSources] = useState<SourceDetails[]>([])

  const changeSourcesPanelSign = (data: SignDetails): void => {
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
      signId: sourcesPanelSign.id,
      wordId: word.id
    }

    window.api.source.create(sourceWithDetails).then((result) => {
      updateSignSource(sourcesPanelSign.id, 'add')
      setSources((prevSources) => [...prevSources, result])
      closeForm()
    })
  }

  const editSource = (
    sourceId: string,
    updatedSource: Partial<SourceWithDetailsToDB>,
    closeForm: () => void
  ): void => {
    window.api.source.update(sourceId, updatedSource).then((result) => {
      if (!result || !sourcesPanelSign) return
      updateSignSource(sourcesPanelSign.id)
      setSources((prevSources) =>
        prevSources.map((s) => (s.id === result.id ? { ...s, ...result } : s))
      )
      closeForm()
    })
  }

  const deleteSource = (deleteId: string): void => {
    if (!sourcesPanelSign) return
    window.api.source.delete(deleteId).then(() => {
      updateSignSource(sourcesPanelSign.id, 'delete')
      setSources((prevSources) => prevSources.filter((s) => s.id !== deleteId))
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
