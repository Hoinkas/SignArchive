import type { Dispatch, SetStateAction } from 'react'
import './ActionButton.css'

interface ActionButtonProps {
  text: string
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  isAtEnd?: boolean
  isPrimary?: boolean
}

function ActionButton(props: ActionButtonProps): React.JSX.Element {
  const { text, setIsFormOpen, isAtEnd = false, isPrimary = false } = props

  return (
    <button className={`${isAtEnd  ? 'isAtEnd' : ''} ${isPrimary  ? 'primary' : ''}`} onClick={() => setIsFormOpen(true)}>
      {text}
    </button>
  )
}

export default ActionButton
