import { type SubmitEvent, useRef } from 'react'
import './Form.css'

interface FormWrapperProps {
  children: React.JSX.Element[] | React.JSX.Element
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  formType: FormType
  closeForm: () => void
}

export function FormModalWrapper(props: FormWrapperProps): React.JSX.Element {
  const { children, handleSubmit, formType, closeForm } = props

  return createPortal(
    <div className="formContainer" onClick={(e) => e.stopPropagation()}>
      <form className="formBox" onSubmit={handleSubmit} noValidate>
        {children}
        <FormButtons formType={formType} closeForm={closeForm} />
      </form>
    </div>,
    document.body
  )
}

export function FormWrapper(props: FormWrapperProps): React.JSX.Element {
  const { children, handleSubmit, formType, closeForm } = props

  return (
    <form onSubmit={handleSubmit} noValidate>
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
  type?: 'text' | 'number' | 'password'
  required?: boolean
  submitted?: boolean
}

export function FormSingleLineInput(props: FormSingleLineInputProps): React.JSX.Element {
  const { label, value, setValue, type = 'text', required = false, submitted = false } = props

  const showError = submitted && required && value === ''

  return (
    <div className="formGroup">
      <label>
        {label}
        {required && <span> *</span>}
      </label>
      <input
        className={`formInput${showError ? ' inputError' : ''}`}
        type={type}
        min={1000}
        max={new Date().getFullYear()}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {showError && <span className="inputErrorText">Tekst wymagany</span>}
    </div>
  )
}

interface FormMultiLineInputProps {
  label: string
  value: string
  setValue: (value: string) => void
  required?: boolean
  submitted?: boolean
}

export function FormMultiLineInput(props: FormMultiLineInputProps): React.JSX.Element {
  const { label, value, setValue, required = false, submitted = false } = props

  const showError = submitted && required && value === ''

  return (
    <div className="formGroup ">
      <label>
        {label}
        {required && <span> *</span>}
      </label>
      <textarea
        className={`formInput${showError ? ' inputError' : ''}`}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        required={required}
      />
      {showError && <span className="inputErrorText">Tekst wymagany</span>}
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

import type { FormType } from '@src/models/yearStartEnd.model'
import { createPortal } from 'react-dom'

interface FormMediaProps {
  label: string
  existingFile?: string
  file: File | null
  setNewFile: (file: File | null) => void
  required?: boolean
  submitted?: boolean
}

export function FormMedia(props: FormMediaProps): React.JSX.Element {
  const { label, existingFile, file, setNewFile, required = false, submitted = false } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const fileName = file?.name ?? existingFile ?? 'Wybierz plik'
  const hasFile = !!(file || existingFile)

  const showError = submitted && required && !(file || existingFile)

  return (
    <div className="formGroup">
      <label>
        {label}
        {required && <span> *</span>}
      </label>
      <button
        type="button"
        className={`fileInput${showError ? ' inputError' : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        <span style={{ color: hasFile ? 'inherit' : 'var(--text-muted)' }}>{fileName}</span>
        {file && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              setNewFile(null)
            }}
            style={{ marginLeft: 8 }}
          >
            ✕
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/*,image/*,text/*"
        style={{ display: 'none' }}
        onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
        required={required}
      />
      {showError && <span className="inputErrorText">Plik wymagany</span>}
    </div>
  )
}
