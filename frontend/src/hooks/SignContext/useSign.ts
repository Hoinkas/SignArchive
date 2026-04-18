import { useContext } from 'react'
import { SignContext, type SignContextValue } from './SignContext'

export function useSign(): SignContextValue {
  const context = useContext(SignContext)
  if (!context) throw new Error('useSign must be used within <SignProvider/>')
  return context
}
