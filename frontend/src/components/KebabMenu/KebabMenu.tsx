import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'
import './KebabMenu.css'
import KebabMenuIcon from '@src/assets/icons/KebabMenuIcon.tsx'

interface KebabMenuProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  handleDelete: () => void
  isHovering: boolean
  isOnPurpleBg?: boolean
}

function KebabMenu({ setIsFormOpen, handleDelete, isHovering, isOnPurpleBg = false }: KebabMenuProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleEditClick(): void {
    setIsFormOpen(true)
    setIsOpen(false)
  }

  function handleDeleteClick(): void {
    handleDelete()
    setIsOpen(false)
  }

  return (
    <div className={`navWrapper ${isHovering || isOpen ? '' : 'hidden'}`} ref={wrapperRef}>
      <button
        className={`menuBtn${isOpen ? ' open' : ''}${isOnPurpleBg ? ' onPurpleBg' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <KebabMenuIcon/>
      </button>

      <nav className={`navDropdown ${isOpen ? 'open' : ''}`}>
        <a onClick={() => handleEditClick()}>edytuj</a>
        <a onClick={() => handleDeleteClick()}>usuń</a>
      </nav>
    </div>
  )
}

export default KebabMenu
