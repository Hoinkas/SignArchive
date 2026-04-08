import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import './DefinitionBox.css'
import type { Definition } from '@shared/types'
import { useState } from 'react'
import DefinitionForm from '@src/components/Form/Forms/DefinitionForm'
import { useDefinitions } from '@contexts/DefinitonsContext/useDefinitions'
import { usePermissions } from '@contexts/PermissionsContext/usePermissions'

interface DefinitionBoxProps {
  definition: Definition
}

function DefinitionBox({ definition }: DefinitionBoxProps): React.JSX.Element {
  const { deleteDefinition } = useDefinitions()
  const { isAdmin } = usePermissions()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <li>
      <div className="listContent">
        <div>
          <p>{definition.text}</p>
          <p className="additionalInfoItalic">= {definition.translation}</p>
        </div>
        {isAdmin ? (isFormOpen ? (
          <DefinitionForm formType="edit" setIsFormOpen={setIsFormOpen} definition={definition} />
        ) : (
          <KebabMenu
            setIsFormOpen={setIsFormOpen}
            handleDelete={() => deleteDefinition(definition.id)}
          />
        )) : <div></div>}
      </div>
    </li>
  )
}

export default DefinitionBox
