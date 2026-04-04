import './DefinitionDetails.css'
import { SignDetails } from '@shared/types'
import { useEffect, useState } from 'react'
import { useDefinitions } from '@contexts/DefinitonsContext/useDefinitions'
import DefinitionContainer from './DefinitionLContainer/DefinitionContainer'
import PillList from '@renderer/components/PillList/PillList'

interface DefinitionListProps {
  sign: SignDetails
  notes: string | undefined
}

function DefinitionDetails({ sign, notes }: DefinitionListProps): React.JSX.Element {
  const { categoriesNames, translations, initiateDefinitions } = useDefinitions()
  const [isDefinitionListOpen, setIsDefinitionListOpen] = useState<boolean>(false)

  useEffect(() => {
    initiateDefinitions(sign)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sign.id])

  return (
    <div className="definitionList">
      <div
        className="definitionMain"
        onClick={() => setIsDefinitionListOpen(!isDefinitionListOpen)}
      >
        <div className="definitionContent">
          {translations.length !== 0 && (
            <div>
              Również:
              <PillList textArray={translations} />
            </div>
          )}
          <p> {isDefinitionListOpen ? '▲' : '▼'} </p>
        </div>
        {notes && <div>{notes}</div>}
      </div>
      {isDefinitionListOpen ? (
        <DefinitionContainer />
      ) : (
        <div className="additionalInfo">{categoriesNames.join(' · ')}</div>
      )}
    </div>
  )
}

export default DefinitionDetails
