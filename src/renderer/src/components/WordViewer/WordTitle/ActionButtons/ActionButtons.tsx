import { Dispatch, SetStateAction } from 'react'
import './ActionButtons.css'

interface ActionButtonsProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function ActionButtons(props: ActionButtonsProps): React.JSX.Element {
  const { setIsFormOpen } = props

  return (
    <div className="actionButtonsBox">
      <button className="actionButton" onClick={() => setIsFormOpen(true)}>
        edytuj
      </button>
    </div>
  )
}

export default ActionButtons
