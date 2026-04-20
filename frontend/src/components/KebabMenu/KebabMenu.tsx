import { useEffect, useRef, useState } from 'react'
import './KebabMenu.css'
import KebabMenuIcon from '@src/assets/icons/KebabMenuIcon.tsx'
import { createPortal } from 'react-dom'

interface KebabMenuProps {
  handleAdd?: () => void
  handleEdit?: () => void
  handleDelete?: () => void
  isHovering: boolean
  addLabel?: string
  editLabel?: string
  deleteLabel?: string
}

function KebabMenu(props: KebabMenuProps): React.JSX.Element {
  const { handleAdd, handleEdit, handleDelete, isHovering, addLabel, editLabel, deleteLabel } = props
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, right: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function openMenu(): void {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 12, right: window.innerWidth - rect.right })
    }
    setIsOpen((prev) => !prev)
  }

  const isAdd = addLabel && handleAdd !== undefined
  const isEdit = editLabel && handleEdit !== undefined
  const isDelete = deleteLabel && handleDelete !== undefined

  return (
    <div className={`navWrapper ${isHovering || isOpen ? '' : 'hidden'}`} ref={wrapperRef}>
      <button
        ref={btnRef}
        className={`menuBtn${isOpen ? ' open' : ''}`}
        onClick={openMenu}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <KebabMenuIcon />
      </button>

      {createPortal(
        <nav
          className={`navDropdown ${isOpen ? 'open' : ''}`}
          style={{ position: 'fixed', top: pos.top, right: pos.right }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {isAdd && <a onClick={() => { handleAdd!(); setIsOpen(false) }}>Dodaj {addLabel}</a>}
          {isEdit && <a onClick={() => { handleEdit!(); setIsOpen(false) }}>Edytuj {editLabel}</a>}
          {isDelete && <a onClick={() => { handleDelete!(); setIsOpen(false) }}>Usuń {deleteLabel}</a>}
        </nav>,
        document.body
      )}
    </div>
  )
}

export default KebabMenu
