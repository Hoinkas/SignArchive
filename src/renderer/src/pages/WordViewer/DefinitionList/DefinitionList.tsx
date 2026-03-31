import './DefinitionList.css'
import { SignWithDetails } from '@shared/types'

interface DefinitionListProps {
  // wordId: string
  sign: SignWithDetails
  // setSignValues: (sign: SignWithDetails) => void
}

function DefinitionList({ wordId, sign, setSignValues }: DefinitionListProps): React.JSX.Element {
  const definitions = sign.definitions
  const categories = definitions.map((d) => d.category)
  const translations = definitions.map((d) => d.translation)

  return (
    <div className="definitionList">
      <div>{translations}</div>
      <div>{categories}</div>
    </div>
  )
}

export default DefinitionList
