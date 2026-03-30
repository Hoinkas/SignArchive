import { SignWithSourceDetails, SourceWithSignerAuthorMediaFile } from '@shared/types'
import { useEffect, useState } from 'react'
import SourceBox from './SourceBox/SourceBox'
import './SourceList.css'
import SourcesTitle from './SourcesTitle/SourcesTitle'

interface SourceListProps {
  sign: SignWithSourceDetails
  closeForm: () => void
}

function SourceList({ sign, closeForm }: SourceListProps): React.JSX.Element {
  const [sources, setSources] = useState<SourceWithSignerAuthorMediaFile[]>([])

  useEffect(() => {
    window.api.source.list(sign.id).then(setSources)
  }, [sign.id])

  return (
    <div className="sourceListContainer">
      <SourcesTitle sign={sign} closeForm={closeForm}/>
      <div className="sourceList">
        <SourceBox source={sign.source} isMainSource={true} />
        {sources.map((source, key) => (
          <SourceBox key={key} source={source} />
        ))}
      </div>
    </div>
  )
}

export default SourceList
