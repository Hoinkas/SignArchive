import KebabMenu from '@src/components/KebabMenu/KebabMenu'
import './DefinitionBox.css'
import { useState } from 'react'
import DefinitionForm from '@src/components/Form/Forms/DefinitionForm'
import { useDefinitions } from '@src/hooks/DefinitonsContext/useDefinitions'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import type { IDefinitionAttached } from '@src/models/definition.model'

interface DefinitionBoxProps {
  definition: IDefinitionAttached
}

function DefinitionBox({ definition }: DefinitionBoxProps): React.JSX.Element {
  const { deleteDefinition } = useDefinitions()
  const { isAdmin } = usePermissions()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <li onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
      <div className="listContent">
        <div>
          <p>{definition.text}</p>
          <p className="additionalInfoItalic">= {definition.translations}</p>
        </div>
        {isAdmin ? (isFormOpen ? (
          <DefinitionForm formType="edit" setIsFormOpen={setIsFormOpen} definition={definition} />
        ) : (
          <KebabMenu
            isHovering={isHovering}
            setIsFormOpen={setIsFormOpen}
            handleDelete={() => deleteDefinition(definition.id)}
          />
        )) : <div></div>}
      </div>
    </li>
  )
}

export default DefinitionBox
