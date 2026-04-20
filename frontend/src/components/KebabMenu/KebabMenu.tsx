import { useEffect, useRef, useState } from 'react'
import './KebabMenu.css'
import KebabMenuIcon from '@src/assets/icons/KebabMenuIcon.tsx'

interface KebabMenuProps {
  handleAdd: () => void
  handleEdit: () => void
  handleDelete: () => void
  isHovering: boolean
  addLabel: string
  editLabel: string
  deleteLabel: string
}

function KebabMenu(props: KebabMenuProps): React.JSX.Element {
  const {handleAdd, handleEdit, handleDelete, isHovering, addLabel, editLabel, deleteLabel} = props
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

  function handleAddClick(): void {
    handleAdd()
    setIsOpen(false)
  }

  function handleEditClick(): void {
    handleEdit()
    setIsOpen(false)
  }

  function handleDeleteClick(): void {
    handleDelete()
    setIsOpen(false)
  }

  return (
    <div className={`navWrapper ${isHovering || isOpen ? '' : 'hidden'}`} ref={wrapperRef}>
      <button
        className={`menuBtn${isOpen ? ' open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <KebabMenuIcon/>
      </button>

      <nav className={`navDropdown ${isOpen ? 'open' : ''}`}>
        <a onClick={() => handleAddClick()}>Dodaj {addLabel}</a>
        <a onClick={() => handleEditClick()}>Edytuj {editLabel}</a>
        <a onClick={() => handleDeleteClick()}>Usuń {deleteLabel}</a>
      </nav>
    </div>
  )
}

export default KebabMenu
