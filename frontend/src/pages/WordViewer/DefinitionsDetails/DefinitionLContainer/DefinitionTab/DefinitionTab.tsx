import type { DefinitionCategoryWithCount } from '@shared/types'
import './DefinitionTab.css'
import { useDefinitions } from '@src/hooks/DefinitonsContext/useDefinitions'
import { titleCase } from '@src/utils/namesHelpers'

interface DefinitionTabProps {
  category: DefinitionCategoryWithCount
}

function DefinitionTab({ category }: DefinitionTabProps): React.JSX.Element {
  const { activeCategory, changeActiveCategory } = useDefinitions()
  const isActive = activeCategory === category.name

  return (
    <div
      className={isActive ? 'definitionTab active' : 'definitionTab'}
      onClick={() => changeActiveCategory(category.name)}
    >
      {titleCase(category.name)} {category.count}
    </div>
  )
}

export default DefinitionTab
