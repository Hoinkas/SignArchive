import { useState } from 'react'
import { FormCustomInputDropdown } from './FormCustomInputDropdown'
import type { DropdownOption } from './FormDropdown'

interface AddTagFormProps {
  label: string
  dropdownOptions: DropdownOption[]
  addValue: (tag: DropdownOption) => void
  required?: boolean
  submitted?: boolean
}

function AddTagForm(props: AddTagFormProps): React.JSX.Element {
  const { label, required, submitted, dropdownOptions, addValue } = props
  const [tag, setTag] = useState<DropdownOption | null>(null)
  const [resetKey, setResetKey] = useState(0)

  const handleTagAdd = (tag: DropdownOption) => {
    addValue(tag)
    setTag(null)
    setResetKey((prev) => prev + 1)
  }

  return (
    <div style={{ display: 'inline-flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      <FormCustomInputDropdown
        key={resetKey}
        label={label}
        options={dropdownOptions}
        value={tag}
        setValue={setTag}
        required={required}
        submitted={submitted}
      />
      {tag && <button type="button" onClick={() => handleTagAdd(tag)}>
        Dodaj
      </button>}
    </div>
  )
}

interface TagFormProps {
  label: string
  tagList: DropdownOption[]
  setTagList: React.Dispatch<React.SetStateAction<DropdownOption[]>>
  dropdownOptions: DropdownOption[]
  required?: boolean
  submitted?: boolean
}

function FormTags(props: TagFormProps): React.JSX.Element {
  const { label, tagList, setTagList, dropdownOptions, required, submitted } = props

  function handleValueAdd(tag: DropdownOption) {
    setTagList((prevState) => [...prevState, tag])
  }

  function handleValueDelete(tag: DropdownOption) {
    setTagList((prevState) => prevState.filter((p) => p.label !== tag.label))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)'}}>
      {tagList.length > 0 && <div className="tagList">
        {tagList.map((tag, key) => (
          <div key={key} className="tag">
            {tag.label}
            <button type="button" onClick={() => handleValueDelete(tag)}>
              x
            </button>
          </div>
        ))}
      </div>}
      <AddTagForm
        label={label}
        addValue={handleValueAdd}
        dropdownOptions={dropdownOptions}
        required={required}
        submitted={submitted}
      />
    </div>
  )
}

export default FormTags
