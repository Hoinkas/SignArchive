import { Dispatch, SetStateAction } from 'react'
import './AddWordButton.css'

interface AddWordButtonProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddWordButton({ setIsFormOpen }: AddWordButtonProps): React.JSX.Element {
  return (
    <button className="addWordButton" onClick={() => setIsFormOpen(true)}>
      Add new word
    </button>
  )
}

export default AddWordButton
