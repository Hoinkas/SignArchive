import KebabMenu from '@renderer/components/KebabMenu/KebabMenu'
import './DefinitionBox.css'
import { Definition } from '@shared/types'
import { useState } from 'react'
import DefinitionForm from '@renderer/components/Form/Forms/DefinitionForm'
import { useDefinitions } from '@contexts/DefinitonsContext/useDefinitions'

interface DefinitionBoxProps {
  definition: Definition
}

function DefinitionBox({ definition }: DefinitionBoxProps): React.JSX.Element {
  const { deleteDefinition } = useDefinitions()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <li>
      <div className="listContent">
        <div>
          <div>{definition.text}</div>
          <div className="additionalInfoItalic">= {definition.translation}</div>
        </div>
        {isFormOpen ? (
          <DefinitionForm formType="edit" setIsFormOpen={setIsFormOpen} definition={definition} />
        ) : (
          <KebabMenu
            setIsFormOpen={setIsFormOpen}
            handleDelete={() => deleteDefinition(definition.id)}
          />
        )}
      </div>
    </li>
  )
}

export default DefinitionBox
