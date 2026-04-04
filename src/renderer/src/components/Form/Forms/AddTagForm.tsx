import { Dispatch, SetStateAction, useState } from 'react'
import { FormCustomInputDropdown } from '../Components/FormCustomInputDropdown'
import { DropdownOption } from '../Components/FormDropdown'
import { TagToDB } from '@shared/types'
import { useTags } from '@contexts/TagsContext/useTags'

interface AddTagFormProps {
  setIsTagFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddTagForm({ setIsTagFormOpen }: AddTagFormProps): React.JSX.Element {
  const { allTags, addTag } = useTags()
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
      <FormCustomInputDropdown label="" options={tagsAsOptions} value={tag} setValue={setTag} />
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
