import { useContext } from 'react'
import { DefinitionsContext, DefinitionsContextValue } from './DefinitionsContext'

export function useDefinitions(): DefinitionsContextValue {
  const context = useContext(DefinitionsContext)
  if (!context) throw new Error('useDefinitions must be used within <DefinitionsProvider/>')
  return context
}
