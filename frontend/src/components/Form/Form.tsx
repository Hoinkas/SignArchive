import { type SubmitEvent, useRef } from 'react'
import './Form.css'
import { createPortal } from 'react-dom'
import type { FormType } from '@src/models/yearStartEnd.model'
import { hasValue } from '@src/utils/hasValue'

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

interface FormTwoInLineWrapperProps {
  children: React.JSX.Element[]
}

export function FormTwoInLineWrapper({ children }: FormTwoInLineWrapperProps): React.JSX.Element {
  return <div className="twoInLine">{children}</div>
}

interface FormInputsWrapperProps {
  children: React.JSX.Element | React.JSX.Element[]
  isValue: boolean
  cleanValue: () => void
  label: string
  required: boolean
  showError: boolean
  errorLabel: string
}

function FormInputsWrapper(props: FormInputsWrapperProps): React.JSX.Element {
  const { children, isValue, cleanValue, label, required, showError, errorLabel } = props
  return <div className="formGroup">
      <label>
        {label}
        {required && <span> *</span>}
      </label>
        <ClearButtonWrapper isValue={isValue} cleanValue={cleanValue}>
          {children}
        </ClearButtonWrapper>
      {showError && <span className="inputErrorText">{errorLabel}</span>}
    </div>
}

interface ClearButtonWrapperProps {
  children: React.JSX.Element | React.JSX.Element[]
  isValue: boolean
  cleanValue: () => void
}

function ClearButtonWrapper({ children, isValue, cleanValue }: ClearButtonWrapperProps): React.JSX.Element {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
      {children}
      {isValue && (
        <span
          onClick={() => cleanValue()}
          style={{ position: 'absolute', right: '8px', cursor: 'pointer', color: 'var(--color-text-info)', fontSize: '16px', lineHeight: 1 }}
        >
          ×
        </span>
      )}
    </div>
  )
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
    <FormInputsWrapper
      isValue={hasValue(value)}
      cleanValue={() => setValue('')}
      label={label}
      required={required}
      showError={showError}
      errorLabel='Tekst wymagany'
    >
      <input
        className={`formInput${showError ? ' inputError' : ''}`}
        type={type}
        min={1000}
        max={new Date().getFullYear()}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ paddingRight: value ? '28px' : undefined }}
      />
    </FormInputsWrapper>
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
    <FormInputsWrapper
      isValue={hasValue(value)}
      cleanValue={() => setValue('')}
      label={label}
      required={required}
      showError={showError}
      errorLabel='Tekst wymagany'
    >
      <textarea
        className={`formInput${showError ? ' inputError' : ''}`}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    </FormInputsWrapper>
  )
}

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
  const showError = submitted && required && !hasFile

  const handleClear = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setNewFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <FormInputsWrapper
      isValue={hasFile}
      cleanValue={() => setNewFile(null)}
      label={label}
      required={required}
      showError={showError}
      errorLabel='Plik wymagany'
    >
      <button
        type="button"
        className={`fileInput${showError ? ' inputError' : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        <span style={{ color: hasFile ? 'inherit' : 'var(--text-muted)' }}>{fileName}</span>
        {file && (
          <span onClick={handleClear} style={{ marginLeft: 8 }}>✕</span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/*,image/*"
        style={{ display: 'none' }}
        onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
      />
    </FormInputsWrapper>
  )
}
