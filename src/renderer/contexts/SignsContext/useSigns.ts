import { useContext } from 'react'
import { SignContext, SignContextValue } from './SignsContext'

export function useSigns(): SignContextValue {
  const context = useContext(SignContext)
  if (!context) throw new Error('useSigns must be used within <SignsProvider/>')
  return context
}
