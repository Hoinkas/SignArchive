import { Dispatch, SetStateAction } from 'react'
import './ActionButton.css'

interface ActionButtonProps {
  text: string
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  isAtEnd?: boolean
}

function ActionButton(props: ActionButtonProps): React.JSX.Element {
  const { text, setIsFormOpen, isAtEnd = false } = props

  return (
    <button className={isAtEnd ? 'isAtEnd' : ''} onClick={() => setIsFormOpen(true)}>
      {text}
    </button>
  )
}

export default ActionButton
