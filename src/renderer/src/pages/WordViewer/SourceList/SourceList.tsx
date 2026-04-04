import { SignDetails } from '@shared/types'
import { useEffect, useRef, useState } from 'react'
import SourceBox from './SourceBox/SourceBox'
import './SourceList.css'
import SourcesTitle from './SourcesTitle/SourcesTitle'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'
import { useSources } from '@contexts/SourcesContext/useSources'

interface SourceListProps {
  sign: SignDetails
}

function SourceList({ sign }: SourceListProps): React.JSX.Element {
  const { sources, closeSourcesPanelSign } = useSources()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && !isFormOpen) {
        closeSourcesPanelSign()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [closeSourcesPanelSign, isFormOpen])

  return (
    <div className="sourceListContainer" ref={wrapperRef}>
      <div>
        <SourcesTitle sign={sign} />
        <div className="sourceList">
          {sources.map((source, key) => (
            <SourceBox key={key} source={source} />
          ))}
        </div>
      </div>
      {isFormOpen ? (
        <SourceForm formType={'add'} setIsFormOpen={setIsFormOpen} />
      ) : (
        <ActionButton text="Dodaj źródło" isAtEnd={true} setIsFormOpen={setIsFormOpen} />
      )}
    </div>
  )
}

export default SourceList
