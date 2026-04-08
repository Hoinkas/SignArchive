import { useState } from 'react'
import React from 'react'
import type { SignDetails, SourceDetails, SourceWithDetailsToCreate, SourceWithDetailsToDB } from '@shared/types'
import { SourcesContext } from './SourcesContext'
import { useWord } from '@contexts/WordContext/useWord'
import { useSigns } from '@contexts/SignsContext/useSigns'
import { sourceApi } from '@renderer/api/source.api'

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
    sourceApi.list(data.id, word.id).then(setSources)
  }

  const closeSourcesPanelSign = (): void => setSourcesPanelSign(null)

  const addSource = (data: SourceWithDetailsToDB, closeForm: () => void): void => {
    if (!sourcesPanelSign || !word) return
    const payload: SourceWithDetailsToCreate = { ...data, signId: sourcesPanelSign.id, wordId: word.id }
    sourceApi.create(payload).then((result) => {
      updateSignSource(sourcesPanelSign.id, 'add')
      setSources((prev) => [...prev, result])
      closeForm()
    })
  }

  const editSource = (
    sourceId: string,
    updatedSource: Partial<SourceWithDetailsToDB>,
    closeForm: () => void
  ): void => {
    sourceApi.update(sourceId, updatedSource).then((result) => {
      if (!result || !sourcesPanelSign) return
      updateSignSource(sourcesPanelSign.id)
      setSources((prev) => prev.map((s) => (s.id === result.id ? { ...s, ...result } : s)))
      closeForm()
    })
  }

  const deleteSource = (deleteId: string): void => {
    if (!sourcesPanelSign) return
    sourceApi.delete(deleteId).then(() => {
      updateSignSource(sourcesPanelSign.id, 'delete')
      setSources((prev) => prev.filter((s) => s.id !== deleteId))
    })
  }

  return (
    <SourcesContext.Provider
      value={{ sources, addSource, editSource, deleteSource, sourcesPanelSign, changeSourcesPanelSign, closeSourcesPanelSign }}
    >
      {children}
    </SourcesContext.Provider>
  )
}
