import './DefinitionContainer.css'
import { useDefinitions } from '@contexts/DefinitonsContext/useDefinitions'
import DefinitionTab from './DefinitionTab/DefinitionTab'
import DefinitionBox from './DefinitionBox/DefinitionBox'
import { useState } from 'react'
import DefinitonForm from '@renderer/components/Form/Forms/DefinitionForm'
import ActionButton from '@renderer/components/ActionButton/ActionButton'

function DefinitionContainer(): React.JSX.Element {
  const { filteredDefinitions, categories } = useDefinitions()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="definitionContainer">
      <div className="definitionTabList">
        {categories.map((category, key) => {
          return <DefinitionTab key={key} category={category} />
        })}
      </div>
      <ol>
        {filteredDefinitions.map((definition, key) => (
          <DefinitionBox key={key} definition={definition} />
        ))}
      </ol>
      <div>
        {isFormOpen ? (
          <DefinitonForm formType="add" setIsFormOpen={setIsFormOpen} />
        ) : (
          <ActionButton text="Dodaj definicję" setIsFormOpen={setIsFormOpen} />
        )}
      </div>
    </div>
  )
}

export default DefinitionContainer
