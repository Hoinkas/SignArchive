import { Dispatch, SetStateAction } from 'react'
import './AddButton.css'

interface AddButtonProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  formVariant: 'word' | 'meaning' | 'sign'
}

function AddButton({ formVariant, setIsFormOpen }: AddButtonProps): React.JSX.Element {
  return (
    <button className="addButton" onClick={() => setIsFormOpen(true)}>
      {formVariant === 'word' ? 'Dodaj nowe słowo' : 'Dodaj nowe znaczenie'}
    </button>
  )
}

export default AddButton
