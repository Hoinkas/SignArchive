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
}

function FormDropdown(props: FormDropdownProps): React.JSX.Element {
  const { label, options, value, setValue, placeholder = 'Szukaj lub wpisz...' } = props

  const [query, setQuery] = useState<string>(value?.label || '')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = (option: DropdownOption): void => {
    setIsOpen(false)

    if (option === value) {
      setValue(null)
      setQuery('')
      return
    }
    setValue(option)
    setQuery(option.label)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    e.stopPropagation()

    if (query.trim()) {
      const custom: DropdownOption = { id: crypto.randomUUID(), label: query.trim() }
      setValue(custom)
      setIsOpen(false)
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

  return (
    <div className="formGroup" ref={containerRef}>
      <label>{label}</label>
      <div className="dropdownWrapper">
        <input
          className={`formInput ${isOpen ? 'dropdownOpen' : ''}`}
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
      </div>
    </div>
  )
}

export default FormDropdown
