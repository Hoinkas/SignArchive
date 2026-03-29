import { SetStateAction, SubmitEvent, useRef, useState } from 'react'
import './Form.css'
import TagList from '../TagList/TagList'
import AddTagForm from './Forms/AddTagForm'
import { FormType } from '@shared/types'

interface FormWrapperProps {
  children: React.JSX.Element[] | React.JSX.Element
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  formType: FormType
  closeForm: () => void
}

export function FormModalWrapper(props: FormWrapperProps): React.JSX.Element {
  const { children, handleSubmit, formType, closeForm } = props

  return (
    <div className="formContainer">
      <form className="formBox" onSubmit={handleSubmit}>
        {children}
        <FormButtons formType={formType} closeForm={closeForm} />
      </form>
    </div>
  )
}

export function FormWrapper(props: FormWrapperProps): React.JSX.Element {
  const { children, handleSubmit, formType, closeForm } = props

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <FormButtons formType={formType} closeForm={closeForm} />
    </form>
  )
}

interface FormTwoInLineWrapperProps {
  children: React.JSX.Element[]
}

export function FormTwoInLineWrapper({ children }: FormTwoInLineWrapperProps): React.JSX.Element {
  return <div className="twoInLine">{children}</div>
}

interface FormSingleLineInputProps {
  label: string
  value: string
  setValue: (value: string) => void
  isNumber?: boolean
}

export function FormSingleLineInput(props: FormSingleLineInputProps): React.JSX.Element {
  const { label, value, setValue, isNumber = false } = props

  return (
    <div className="formGroup">
      <label>{label}</label>
      <input
        className="formInput"
        type={isNumber ? 'number' : 'text'}
        min={1000}
        max={new Date().getFullYear()}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  )
}

interface FormMultiLineInputProps {
  label: string
  value: string
  setValue: (value: string) => void
}

export function FormMultiLineInput(props: FormMultiLineInputProps): React.JSX.Element {
  const { label, value, setValue } = props

  return (
    <div className="formGroup">
      <label>{label}</label>
      <textarea onChange={(event) => setValue(event.target.value)} value={value} />
    </div>
  )
}

interface FormTagsProps {
  label: string
  tags: string[]
  setTags: (value: SetStateAction<string[]>) => void
}

export function FormTags(props: FormTagsProps): React.JSX.Element {
  const { label, tags, setTags } = props
  const [isTagFormOpen, setIsTagFormOpen] = useState<boolean>(false)

  const handleTagAdd = (newTag: string): void => {
    setTags((prevState) => [...prevState, newTag])
  }

  return (
    <div className="formGroup">
      <label>{label}</label>
      <div className="tagsGroup">
        <TagList textArray={tags} setTags={setTags} />
        {isTagFormOpen ? (
          <AddTagForm handleTagAdd={handleTagAdd} setIsTagFormOpen={setIsTagFormOpen} />
        ) : (
          <button type="button" onClick={() => setIsTagFormOpen(true)}>
            +dodaj tag
          </button>
        )}
      </div>
    </div>
  )
}

interface FormButtonsProps {
  formType: FormType
  closeForm: () => void
}

export function FormButtons(props: FormButtonsProps): React.JSX.Element {
  const { formType, closeForm } = props

  return (
    <div className="buttonGroup">
      <button type="submit">{formType === 'edit' ? 'Zapisz' : 'Dodaj'}</button>
      <button type="button" onClick={() => closeForm()}>
        Anuluj
      </button>
    </div>
  )
}

interface FormMediaFileProps {
  file: File | null
  setFile: (file: File | null) => void
}

export function FormMediaFile({ file, setFile }: FormMediaFileProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="formGroup">
      <label>Plik ze znakiem</label>
      <button type="button" className="fileInput" onClick={() => inputRef.current?.click()}>
        <span>{file ? file.name : 'Wybierz plik'}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/*,image/*,text/*"
        style={{ display: 'none' }}
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
    </div>
  )
}
