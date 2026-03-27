import { Dispatch, SetStateAction, useState } from 'react'
import './AddTagForm.css'

interface AddTagFormProps {
  handleTagAdd: (newTag: string) => void
  setIsTagFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddTagForm({ handleTagAdd, setIsTagFormOpen }: AddTagFormProps): React.JSX.Element {
  const [tag, setTag] = useState<string>('')

  const handleAddTagForm = (): void => {
    handleTagAdd(tag)
    setIsTagFormOpen(false)
  }

  return (
    <div className="addTagForm">
      <input type="text" value={tag} onChange={(event) => setTag(event.target.value)} />
      <button type="submit" onClick={() => handleAddTagForm()}>
        Dodaj
      </button>
      <button type="reset" onClick={() => setIsTagFormOpen(false)}>
        Anuluj
      </button>
    </div>
  )
}

export default AddTagForm
