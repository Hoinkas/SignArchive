import { SignWithDetails } from '@shared/types'
import { useState } from 'react'
import SourceBox from './SourceBox/SourceBox'
import './SourceList.css'
import SourcesTitle from './SourcesTitle/SourcesTitle'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'
import { useSources } from '@contexts/SourcesContext/useSources'

interface SourceListProps {
  sign: SignWithDetails
}

function SourceList({ sign }: SourceListProps): React.JSX.Element {
  const { sources } = useSources()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="sourceListContainer">
      <div>
        <SourcesTitle sign={sign} setIsFormOpen={setIsFormOpen} />
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
