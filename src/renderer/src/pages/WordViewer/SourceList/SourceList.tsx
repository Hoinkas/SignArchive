import { SignWithDetails, SourceWithAuthorMediaFile } from '@shared/types'
import { useEffect, useState } from 'react'
import SourceBox from './SourceBox/SourceBox'
import './SourceList.css'
import SourcesTitle from './SourcesTitle/SourcesTitle'
import ActionButton from '@renderer/components/ActionButton/ActionButton'
import SourceForm from '@renderer/components/Form/Forms/SourceForm'
import { useWord } from '@contexts/WordContext/useWord'

interface SourceListProps {
  sign: SignWithDetails
  closeForm: () => void
}

function SourceList({ sign, closeForm }: SourceListProps): React.JSX.Element {
  const [sources, setSources] = useState<SourceWithAuthorMediaFile[]>([])
  const { wordDetails } = useWord()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!wordDetails) return
    window.api.source.list(sign.id, wordDetails.id).then(setSources)
  }, [sign.id, wordDetails])

  const setSourceValues = (source: SourceWithAuthorMediaFile): void => {
    setSources((prevState) => {
      const exists = prevState.some((s) => s.id === source.id)

      return exists
        ? prevState.map((s) => (s.id === source.id ? source : s))
        : [...prevState, source]
    })
  }

  const deleteSource = (deletedId: string): void => {
    window.api.source.delete(deletedId).then(() => {
      setSources((prevState) => prevState.filter((s) => s.id !== deletedId))
    })
  }

  return (
    <div className="sourceListContainer">
      <div>
        <SourcesTitle sign={sign} closeForm={closeForm} />
        <div className="sourceList">
          {sources.map((source, key) => (
            <SourceBox
              key={key}
              source={source}
              signId={sign.id}
              deleteSource={deleteSource}
              setSourceValues={setSourceValues}
            />
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
