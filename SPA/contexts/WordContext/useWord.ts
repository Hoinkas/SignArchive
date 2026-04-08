import { useContext } from 'react'
import { WordContext, type WordContextValue } from './WordContext'

export function useWord(): WordContextValue {
  const context = useContext(WordContext)
  if (!context) throw new Error('useWord must be used within <WordProvider/>')
  return context
}
