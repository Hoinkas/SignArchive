import { useWord } from '@contexts/WordContext/useWord'
import { Dispatch, SetStateAction, useState } from 'react'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import { DropdownOption } from '../Components/FormDropdown'
import { TagDropdownOption } from '@shared/types'

interface AddTagFormProps {
  handleTagAdd: (newTag: TagDropdownOption) => void
  setIsTagFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddTagForm(props: AddTagFormProps): React.JSX.Element {
  const { handleTagAdd, setIsTagFormOpen } = props
  const { allTags, addTag } = useWord()
  const [tag, setTag] = useState<DropdownOption | null>(null)

  const handleAddTagForm = (): void => {
    if (!tag) return
    let exists = allTags.find((t) => t.id === tag.id)
    if (!exists) exists = addTag(tag.label)
    if (!exists) return

    handleTagAdd(exists)
    setIsTagFormOpen(false)
  }

  const tagsAsOptions: DropdownOption[] = allTags.map((t) => {
    return { id: t.id, label: t.name }
  })

  return (
    <div style={{ display: 'inline-flex', gap: 'var(--space-4)' }}>
      <FormCustomInputDropdown label="" options={tagsAsOptions} value={tag} setValue={setTag} />
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
