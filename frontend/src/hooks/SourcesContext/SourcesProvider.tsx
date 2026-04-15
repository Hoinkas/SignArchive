import { useState } from 'react'
import React from 'react'
import { SourcesContext } from './SourcesContext'
import { useWord } from '@src/hooks/WordContext/useWord'
import { useSigns } from '@src/hooks/SignsContext/useSigns'
import { sourceApi } from '@src/services/source.api'
import type { ISourceDetails, ISourceWithDetailsToCreate, ISourceWithDetailsToDB } from '@src/models/source.model'
import type { ISignDetails } from '@src/models/sign.model'
import { signApi } from '@src/services/sign.api'

interface Props {
  children?: React.ReactNode
}

export default function SourcesProvider({ children }: Props): React.JSX.Element {
  const { word } = useWord()
  const { updateSignSource } = useSigns()
  const [sourcesPanelSign, setSourcesPanelSign] = useState<ISignDetails | null>(null)
  const [sources, setSources] = useState<ISourceDetails[]>([])
  const [sourcesListLoading, setSourcesListLoading] = useState<boolean>(false)

  const changeSourcesPanelSign = (data: ISignDetails): void => {
    if (!word) return
    setSourcesPanelSign(data)
    setSources([])
    setSourcesListLoading(true)
    sourceApi.list(data.id, word.id)
      .then(setSources)
      .finally(() => setSourcesListLoading(false))
  }

  const closeSourcesPanelSign = (): void => setSourcesPanelSign(null)

  const addEditDeleteSource = (signId: string, action?: 'add' | 'delete'): void => {
    signApi.yearsRegions(signId, word.id).then((result) => {
      updateSignSource(signId, result, action)
      setSourcesPanelSign((prev) => {return {...prev, yearStart: result.yearStart, yearEnd: result.yearEnd}})
    })
  }

  const addSource = (data: ISourceWithDetailsToDB, closeForm: () => void): void => {
    if (!sourcesPanelSign || !word) return
    const payload: ISourceWithDetailsToCreate = { ...data, signId: sourcesPanelSign.id, wordId: word.id }
    sourceApi.create(payload).then((result) => {
      addEditDeleteSource(sourcesPanelSign.id, 'add')
      setSources((prev) => [...prev, result])
      closeForm()
    })
  }

  const editSource = (
    sourceId: string,
    updatedSource: Partial<ISourceWithDetailsToDB>,
    closeForm: () => void
  ): void => {
    sourceApi.update(sourceId, updatedSource).then((result) => {
      if (!result || !sourcesPanelSign) return
      addEditDeleteSource(sourcesPanelSign.id)
      setSources((prev) => prev.map((s) => (s.id === result.id ? { ...s, ...result } : s)))
      closeForm()
    })
  }

  const deleteSource = (deleteId: string): void => {
    if (!sourcesPanelSign) return
    sourceApi.delete(deleteId).then(() => {
      addEditDeleteSource(sourcesPanelSign.id, 'delete')
      setSources((prev) => prev.filter((s) => s.id !== deleteId))
    })
  }

  return (
    <SourcesContext.Provider
      value={{ sources, addSource, editSource, deleteSource, sourcesPanelSign, changeSourcesPanelSign, closeSourcesPanelSign, sourcesListLoading }}
    >
      {children}
    </SourcesContext.Provider>
  )
}
