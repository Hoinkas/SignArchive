import { useContext } from 'react'
import { SourcesContext, type SourcesContextValue } from './SourcesContext'

export function useSources(): SourcesContextValue {
  const context = useContext(SourcesContext)
  if (!context) throw new Error('useSources must be used within <SourcesProvider/>')
  return context
}
