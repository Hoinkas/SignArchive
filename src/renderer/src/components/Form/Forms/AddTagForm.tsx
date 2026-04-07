import { Dispatch, SetStateAction, useState } from 'react'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import { DropdownOption } from '../Components/FormDropdown'
import { TagToDB } from '@shared/types'
import { useTags } from '@contexts/TagsContext/useTags'
import { useWord } from '@contexts/WordContext/useWord'

interface AddTagFormProps {
  setIsTagFormOpen: Dispatch<SetStateAction<boolean>>
  required?: boolean
  submitted?: boolean
}

function AddTagForm({ setIsTagFormOpen, required, submitted }: AddTagFormProps): React.JSX.Element {
  const { addTag } = useTags()
  const { allTags } = useWord()
  const [tag, setTag] = useState<DropdownOption | null>(null)

  const handleAddTagForm = async (): Promise<void> => {
    if (!tag) return

    const tagToDB: TagToDB = { name: tag.label }
    addTag(tagToDB)

    setIsTagFormOpen(false)
  }

  const tagsAsOptions: DropdownOption[] = allTags.map((t) => {
    return { id: t.id, label: t.name }
  })

  return (
    <div style={{ display: 'inline-flex', gap: 'var(--space-4)' }}>
      <FormCustomInputDropdown
        label=""
        options={tagsAsOptions}
        value={tag}
        setValue={setTag}
        required={required}
        submitted={submitted}
      />
      <button type="button" onClick={() => handleAddTagForm()}>
        Dodaj
      </button>
      <button type="reset" onClick={() => setIsTagFormOpen(false)}>
        Anuluj
      </button>
    </div>
  )
}

export default AddTagForm
