import { useContext } from 'react'
import { MeaningListContext, type MeaningListContextValue } from './MeaningListContext'

export function useMeaningList(): MeaningListContextValue {
  const context = useContext(MeaningListContext)
  if (!context) throw new Error('useMeaningList must be used within <MeaningListProvider/>')
  return context
}
