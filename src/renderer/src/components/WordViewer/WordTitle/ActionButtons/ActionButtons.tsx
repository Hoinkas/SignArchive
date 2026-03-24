import { Dispatch, SetStateAction } from 'react'
import './ActionButtons.css'

interface ActionButtonsProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function ActionButtons({ setIsFormOpen }: ActionButtonsProps): React.JSX.Element {
  return (
    <div className="actionButton">
      <button className="editButton" onClick={() => setIsFormOpen(true)}>
        edytuj słowo
      </button>
    </div>
  )
}

export default ActionButtons
