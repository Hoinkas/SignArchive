import { useContext } from 'react'
import { SignContext, SignContextValue } from './SignsContext'

export function useSign(): SignContextValue {
  const context = useContext(SignContext)
  if (!context) throw new Error('useSign must be used within <SignsProvider/>')
  return context
}
