import { Dispatch, SetStateAction } from 'react'
import './ActionButton.css'

interface ActionButtonProps {
  text: string
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function ActionButton({ text, setIsFormOpen }: ActionButtonProps): React.JSX.Element {
  return <button onClick={() => setIsFormOpen(true)}>{text}</button>
}

export default ActionButton
