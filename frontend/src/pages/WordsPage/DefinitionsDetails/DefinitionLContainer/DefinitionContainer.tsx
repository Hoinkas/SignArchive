import './DefinitionContainer.css'
import { useDefinitions } from '@src/hooks/DefinitonsContext/useDefinitions'
import DefinitionTab from './DefinitionTab/DefinitionTab'
import DefinitionBox from './DefinitionBox/DefinitionBox'
import { useState } from 'react'
import DefinitonForm from '@src/components/Form/Forms/DefinitionForm'
import ActionButton from '@src/components/ActionButton/ActionButton'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'

function DefinitionContainer(): React.JSX.Element {
  const { isAdmin } = usePermissions()
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
        {isAdmin ? (isFormOpen ? (
          <DefinitonForm formType="add" setIsFormOpen={setIsFormOpen} />
        ) : (
          <ActionButton text="Dodaj definicję" setIsFormOpen={setIsFormOpen} />
        )) : <div></div>}
      </div>
    </div>
  )
}

export default DefinitionContainer
