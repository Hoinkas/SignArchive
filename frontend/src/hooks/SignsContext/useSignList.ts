import { useContext } from 'react'
import { SignListContext, type SignListContextValue } from './SignListContext'

export function useSignList(): SignListContextValue {
  const context = useContext(SignListContext)
  if (!context) throw new Error('useSignList must be used within <SignListProvider/>')
  return context
}
