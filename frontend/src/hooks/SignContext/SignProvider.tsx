import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'
import { SignContext } from './SignContext'
import { signApi } from '@src/services/sign.api'
import type { ISignDetails, ISignDetailsToDB } from '@src/models/sign.model'
import { useSignList } from '../SignListContext/useSignList'
import { mapDetailedSignToSimple } from '@src/utils/signsTypesHelpers'
import type { IMediaToDB } from '@src/models/media.model'
import { mediaApi } from '@src/services/media.api'
import type { IMeaningAttached, IMeaningToDB } from '@src/models/meaning.model'
import type { DropdownOption } from '@src/components/Form/Components/DropdownOptions'
import { addWordsToMeaning, applyWordChangesToState, deleteWordsFromMeaning, getWordChanges } from './wordToMeaningActions'
import { meaningApi } from '@src/services/meaning.api'
import type { IWordAttached } from '@src/models/word.model'
import type { IRegionAttached } from '@src/models/region.model'
import type { ISourceWithDetailsToDB, ISourceDetails } from '@src/models/source.model'
import { sourceApi } from '@src/services/source.api'
import { addRegionsToSource, getRegionChanges, deleteRegionsFromSource, applyRegionChangesToState } from './sourceToMeaningActions'
import { referenceApi } from '@src/services/reference.api'
import { useSearchParams } from 'react-router-dom'
import updateParam from '@src/utils/updateParam'

interface Props {
  children?: React.ReactNode
}

export default function SignProvider({ children }: Props): React.JSX.Element {
  const { addSignToSignList, editSignInSignList, deleteSignFromSignList } = useSignList()

  const [sign, setSign] = useState<ISignDetails | null>(null)
  const [signLoading, setSignLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const paramsSignId = searchParams.get('signId') ?? ''

  useEffect(() => {
    if (!paramsSignId) return

    signApi.details(paramsSignId)
      .then((data) => setSign(data))
      .catch(console.error)
      .finally(() => setSignLoading(false))
  }, [paramsSignId])

  const openCloseSidePanel = useCallback((signId: string): void => {
    if (paramsSignId === signId) {
      setSign(null)
      updateParam('signId', null, setSearchParams)
      return
    }

    setSignLoading(true)
    updateParam('signId', signId, setSearchParams)
    signApi.details(signId)
      .then((data) => {
        setSign(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => setSignLoading(false))
  }, [paramsSignId, setSearchParams])

  const simpleSign = useMemo(() => {
    if (!sign) return null
    return mapDetailedSignToSimple(sign)
  },[sign])

  const addSignAndMedia = (data: ISignDetailsToDB, media: IMediaToDB, closeForm: () => void): void => {
    mediaApi.create(media)
      .then((media) => signApi.create({ ...data, mediaId: media.id }))
      .then((result) => {
        addSignToSignList(result)
        closeForm()
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  const editSignAndMedia = (signId: string, signChanges: Partial<ISignDetailsToDB>, mediaChanges: Partial<IMediaToDB>, closeForm: () => void): void => {
    Promise.all([
      mediaChanges ? mediaApi.update(sign!.media.id, mediaChanges) : Promise.resolve(),
      Object.keys(signChanges).length > 0 ? signApi.update(signId, signChanges) : Promise.resolve()
    ])
      .then(() => {
        setSign((prev) => {
          const updated = { ...prev, ...signChanges } as ISignDetails
          editSignInSignList(mapDetailedSignToSimple(updated))
          return updated
        })
        closeForm()
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  const deleteSignAndMedia = (): void => {
    if (!sign) return
    signApi.delete(sign.id)
      .then(() => {
        setSign(null)
        deleteSignFromSignList(sign.id)
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }

  const addMeaning = (data: IMeaningToDB, words: DropdownOption[], closeForm: () => void): void => {
    if (!sign) return
    meaningApi.create(sign.id, data)
      .then((result) =>
        addWordsToMeaning(result.id, words)
          .then((createdWords) => {
            setSign((prev) => prev ? {
              ...prev,
              meanings: [...prev.meanings, { ...result, words: createdWords }]
            } : prev)
          })
      )
      .catch((err) => { console.error(err); throw err })
      .finally(() => closeForm())
  }

  const editMeaning = (
    meaningId: string,
    meaningChanges: Partial<IMeaningAttached>,
    oldWords: DropdownOption[],
    newWords: DropdownOption[],
    closeForm: () => void
  ): void => {
    const { toAdd, toDelete } = getWordChanges(oldWords, newWords)

    Promise.all([
      Object.keys(meaningChanges).length > 0 ? meaningApi.update(meaningId, meaningChanges) : Promise.resolve(),
      addWordsToMeaning(meaningId, toAdd),
      deleteWordsFromMeaning(meaningId, toDelete)
    ])
      .then(([, addedWords]) => {
        setSign((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            meanings: applyWordChangesToState(
              prev.meanings, meaningId, meaningChanges, addedWords as IWordAttached[], toDelete.map((w) => w.id)
            )
          }
        })
      })
      .catch((err) => { console.error(err); throw err })
      .finally(() => closeForm())
  }

  const deleteMeaning = (deleteId: string): void => {
    meaningApi.delete(deleteId)
      .then(() => setSign((prev) => prev ? {
        ...prev,
        meanings: prev.meanings.filter((m) => m.id !== deleteId)
      } : prev))
      .catch((err) => { console.error(err); throw err })
  }

  const addSource = (meaningId: string, data: ISourceWithDetailsToDB, regions: DropdownOption[], closeForm: () => void): void => {
    referenceApi.create(data.reference)
      .then((reference) => sourceApi.create(meaningId, { ...data.source, referenceId: reference.id }))
      .then((result) =>
        addRegionsToSource(result.id, regions)
          .then((createdRegions) => {
            setSign((prev) => prev ? {
              ...prev,
              meanings: prev.meanings.map((m) => m.id === meaningId
                ? { ...m, sources: [...m.sources, { ...result, regions: createdRegions }] }
                : m
              )
            } : prev)
          })
      )
      .catch((err) => { console.error(err); throw err })
      .finally(() => closeForm())
  }

  const editSource = (
    meaningId: string,
    sourceId: string,
    sourceChanges: Partial<ISourceDetails>,
    oldRegions: DropdownOption[],
    newRegions: DropdownOption[],
    closeForm: () => void
  ): void => {
    const { toAdd, toDelete } = getRegionChanges(oldRegions, newRegions)
    const { reference, regions: _, ...source } = sourceChanges

    if (!reference) return
    const referenceId = reference.id

    Promise.all([
      Object.keys(sourceChanges).length > 0 ? sourceApi.update(sourceId, {...source, referenceId }) : Promise.resolve(),
      sourceChanges.reference && referenceId
        ? referenceApi.update(referenceId, sourceChanges.reference)
        : Promise.resolve(),
      addRegionsToSource(sourceId, toAdd),
      deleteRegionsFromSource(sourceId, toDelete)
    ])
      .then(([,, addedRegions]) => {
        setSign((prev) => prev ? {
          ...prev,
          meanings: prev.meanings.map((m) => m.id === meaningId ? {
            ...m,
            sources: applyRegionChangesToState(
              m.sources, sourceId, sourceChanges, addedRegions as IRegionAttached[], toDelete.map((r) => r.id)
            )
          } : m)
        } : prev)
      })
      .catch((err) => { console.error(err); throw err })
      .finally(() => closeForm())
  }

  const deleteSource = (meaningId: string, sourceId: string): void => {
    const source = sign?.meanings
      .flatMap((m) => m.sources)
      .find((s) => s.id === sourceId)

    const referenceId = source?.reference.id

    sourceApi.delete(sourceId)
      .then(() => referenceId ? referenceApi.delete(referenceId) : Promise.resolve())
      .then(() => setSign((prev) => prev ? {
        ...prev,
        meanings: prev.meanings.map((m) => m.id === meaningId ? {
          ...m,
          sources: m.sources.filter((s) => s.id !== sourceId)
        } : m)
      } : prev))
      .catch((err) => { console.error(err); throw err })
  }

  return (
    <SignContext.Provider value={{
      sign,
      simpleSign,
      signLoading,
      openCloseSidePanel,
      addSignAndMedia,
      editSignAndMedia,
      deleteSignAndMedia,
      addMeaning,
      editMeaning,
      deleteMeaning,
      addSource,
      editSource,
      deleteSource
    }}>
      {children}
    </SignContext.Provider>
  )
}
