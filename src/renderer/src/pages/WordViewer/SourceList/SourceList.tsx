import { SignWithSourceDetails, Source, SourceWithSignerAuthorMediaFile } from '@shared/types'
import { useEffect, useState } from 'react'
import SourceBox from './SourceBox/SourceBox'
import './SourceList.css'
import SourcesTitle from './SourcesTitle/SourcesTitle'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'

interface SourceListProps {
  sign: SignWithSourceDetails
  closeForm: () => void
}

function SourceList({ sign, closeForm }: SourceListProps): React.JSX.Element {
  const [sources, setSources] = useState<SourceWithSignerAuthorMediaFile[]>([])
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    window.api.source.list(sign.id).then(setSources)
  }, [sign.id])

  const setSourceValues = (source: Source): void => {
    setSources((prevState) => {
      const exists = prevState.some((s) => s.id === source.id)

      return {
        ...prevState,
        sources: exists
          ? prevState.map((s) => (s.id === source.id ? source : s))
          : [...prevState, source]
      }
    })
  }

  return (
    <div className="sourceListContainer">
      <div>
        <SourcesTitle sign={sign} closeForm={closeForm} />
        <div className="sourceList">
          <SourceBox source={sign.source} isMainSource={true} />
          {sources.map((source, key) => (
            <SourceBox key={key} source={source} />
          ))}
        </div>
      </div>
      {isFormOpen ? (
        <SourceForm
          signId={sign.id}
          setSourceValues={setSourceValues}
          formType={'add'}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <ActionButton text="Dodaj źródło" isAtEnd={true} setIsFormOpen={setIsFormOpen} />
      )}
    </div>
  )
}

export default SourceList
