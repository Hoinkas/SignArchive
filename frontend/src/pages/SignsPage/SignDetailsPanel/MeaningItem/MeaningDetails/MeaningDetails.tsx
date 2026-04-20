import type { IMeaningDetails } from '@src/models/meaning.model'
import { useState } from 'react'
import MeaningFormsActions from './MeaningFormsActions'

interface MeaningDetailsProps {
  meaning: IMeaningDetails
}

function MeaningDetails({meaning}: MeaningDetailsProps): React.JSX.Element {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <div style={{display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center'}}
    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {meaning.explanation}
      <MeaningFormsActions meaning={meaning} isHovering={isHovering}/>
    </div>
  )
}

export default MeaningDetails
