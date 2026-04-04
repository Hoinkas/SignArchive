import { useState } from 'react'
import React from 'react'
import {
  SignDetails,
  SourceDetails,
  SourceWithDetailsToCreate,
  SourceWithDetailsToDB,
  YearStartEnd
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

  const recalculateYears = (updatedSources: SourceDetails[]): YearStartEnd => {
    const years = [
      ...updatedSources.map((s) => s.yearStart),
      ...updatedSources.map((s) => s.yearEnd)
    ].filter((y): y is number => y != null)

    return {
      yearStart: years.length > 0 ? Math.min(...years) : null,
      yearEnd: years.length > 0 ? Math.max(...years) : null
    }
  }

  const addSource = (data: SourceWithDetailsToDB, closeForm: () => void): void => {
    if (!sourcesPanelSign || !word) return

    const sourceWithDetails: SourceWithDetailsToCreate = {
      ...data,
      signId: sourcesPanelSign.id,
      wordId: word.id
    }

    window.api.source.create(sourceWithDetails).then((result) => {
      setSources((prevSources) => {
        const updated = [...prevSources, result]
        const { yearStart, yearEnd } = recalculateYears(updated)
        setSourcesPanelSign((prev) => (prev ? { ...prev, yearStart, yearEnd } : prev))
        changeSourcesCountInSign('add', sourcesPanelSign.id)
        return updated
      })
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
      setSources((prevSources) => {
        const updated = prevSources.map((s) => (s.id === result.id ? { ...s, ...result } : s))
        const { yearStart, yearEnd } = recalculateYears(updated)
        setSourcesPanelSign((prev) => (prev ? { ...prev, yearStart, yearEnd } : prev))
        return updated
      })
      closeForm()
    })
  }

  const deleteSource = (deleteId: string): void => {
    if (!sourcesPanelSign) return
    const signId = sourcesPanelSign.id

    window.api.source.delete(deleteId).then(() => {
      setSources((prevSources) => {
        const updated = prevSources.filter((s) => s.id !== deleteId)
        const { yearStart, yearEnd } = recalculateYears(updated)
        setSourcesPanelSign((prev) => (prev ? { ...prev, yearStart, yearEnd } : prev))
        changeSourcesCountInSign('remove', signId)
        return updated
      })
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
