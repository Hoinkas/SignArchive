import { useEffect, useRef, useState } from 'react'
import SourceBox from './SourceBox/SourceBox'
import './SourceList.css'
import SourcesTitle from './SourcesTitle/SourcesTitle'
import ActionButton from '@src/components/ActionButton/ActionButton'
import SourceForm from '@src/components/Form/Forms/SourceForm'
import { useSources } from '@src/hooks/SourcesContext/useSources'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import type { ISignDetails } from '@src/models/sign.model'
import Loader from '@src/components/Loader/Loader'

interface SourceListProps {
  sign: ISignDetails
}

function SourceList({ sign }: SourceListProps): React.JSX.Element {
  const { sources, closeSourcesPanelSign, sourcesListLoading } = useSources()
  const { isAdmin } = usePermissions()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormOpen])

  if (sourcesListLoading) return <Loader/>

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
      {isAdmin ? (isFormOpen ? (
        <SourceForm formType={'add'} setIsFormOpen={setIsFormOpen} />
      ) : (
        <ActionButton text="Dodaj źródło" isAtEnd buttonAction={() => setIsFormOpen(true)} />
      )) : <div></div>}
    </div>
  )
}

export default SourceList
