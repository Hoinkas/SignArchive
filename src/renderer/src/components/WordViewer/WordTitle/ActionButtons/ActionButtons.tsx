import { Dispatch, SetStateAction } from 'react'
import './ActionButtons.css'

interface ActionButtonsProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  setIsComparsionActive: Dispatch<SetStateAction<boolean>>
}

function ActionButtons(props: ActionButtonsProps): React.JSX.Element {
  const { setIsFormOpen, setIsComparsionActive } = props

  return (
    <div className="actionButtonsBox">
      <button className="actionButton" onClick={() => setIsFormOpen(true)}>
        edytuj
      </button>
      <button className="actionButton" onClick={() => setIsComparsionActive(true)}>
        porównaj
      </button>
    </div>
  )
}

export default ActionButtons
