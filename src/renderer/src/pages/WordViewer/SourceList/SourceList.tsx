import { SignWithDetails, SourceWithAuthorMediaFile } from '@shared/types'
import { useEffect, useState } from 'react'
import SourceBox from './SourceBox/SourceBox'
import './SourceList.css'
import SourcesTitle from './SourcesTitle/SourcesTitle'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'

interface SourceListProps {
  wordId: string
  sign: SignWithDetails
  closeForm: () => void
}

function SourceList({ wordId, sign, closeForm }: SourceListProps): React.JSX.Element {
  const [sources, setSources] = useState<SourceWithAuthorMediaFile[]>([])
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    window.api.source.list(sign.id, wordId).then(setSources)
  }, [sign.id, wordId])

  const setSourceValues = (source: SourceWithAuthorMediaFile): void => {
    setSources((prevState) => {
      const exists = prevState.some((s) => s.id === source.id)

      return exists
        ? prevState.map((s) => (s.id === source.id ? source : s))
        : [...prevState, source]
    })
  }

  return (
    <div className="sourceListContainer">
      <div>
        <SourcesTitle sign={sign} closeForm={closeForm} />
        <div className="sourceList">
          {sources.map((source, key) => (
            <SourceBox key={key} source={source} />
          ))}
        </div>
      </div>
      {isFormOpen ? (
        <SourceForm
          wordId={wordId}
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
