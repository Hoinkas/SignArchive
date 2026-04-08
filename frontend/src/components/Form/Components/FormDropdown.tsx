import { useState, useRef, useEffect } from 'react'
import './FormDropdown.css'

export interface DropdownOption {
  id: string
  label: string
}

interface FormDropdownProps {
  label: string
  options: DropdownOption[]
  value: DropdownOption | null
  setValue: (value: DropdownOption | null) => void
  placeholder?: string
  required?: boolean
  submitted?: boolean
}

function FormDropdown(props: FormDropdownProps): React.JSX.Element {
  const {
    label,
    options,
    value,
    setValue,
    placeholder = 'Szukaj lub wpisz...',
    required = false,
    submitted = false
  } = props

  const [query, setQuery] = useState<string>(value?.label || '')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  const handleSelect = (option: DropdownOption): void => {
    setValue(option)
    setQuery(option.label)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    e.stopPropagation()

    if (filtered.length > 0) {
      handleSelect(filtered[0])
      return
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
    setValue(null)
    setIsOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showError = required && submitted && value === null

  return (
    <div className="formGroup" ref={containerRef}>
      <label>
        {label}
        {required && <span> *</span>}
      </label>
      <div className="dropdownWrapper">
        <input
          className={`formInput ${isOpen ? ' dropdownOpen' : ''}${showError ? ' inputError' : ''}`}
          type="search"
          value={query}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {isOpen && (
          <div className="dropdownList">
            {options.map((option) => (
              <div
                key={option.id}
                className="dropdownItem"
                onMouseDown={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        {showError && <span className="inputErrorText">Wybór wymagany</span>}
      </div>
    </div>
  )
}

export default FormDropdown
