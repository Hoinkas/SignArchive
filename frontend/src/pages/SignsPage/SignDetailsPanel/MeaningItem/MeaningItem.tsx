import type { IMeaningDetails } from '@src/models/meaning.model'
import './MeaningItem.css'
import SourceItem from './SourceItem/SourceItem'
import { currencyOfSources } from '@src/utils/currencyOfSources'
import PillList from '@src/components/PillList/PillList'
import { useState } from 'react'
import SourceForm from '@src/components/Form/Forms/SourceForm'
import ActionButton from '@src/components/ActionButton/ActionButton'

// const sources: ISourceDetails[] =
//   [
//       {
//         id: '',
//         createdAt: 0,
//         context: 'No oznacza kraj',
//         yearStart: 1985,
//         yearEnd: 2026,
//         reference: {
//           id: '',
//           createdAt: 0,
//           name: 'Świat Głuchych',
//           fullName: 'Magazyn Świat Głuchych wydawany przez PZG',
//           type: 'book',
//           url: '',
//           notes: 'To magazyn słyszaków. Nie wiadomo czy g/Głusi używali tych znaków'
//         },
//         regions: [{id: '', createdAt: 0, name: 'Kraków'}, {id: '', createdAt: 0, name: 'Warszawa'}]
//         },
//         {
//         id: '',
//         createdAt: 0,
//         context: 'No oznacza kraj',
//         yearStart: 1985,
//         yearEnd: 2026,
//         reference: {
//           id: '',
//           createdAt: 0,
//           name: 'Świat Głuchych',
//           fullName: 'Magazyn Świat Głuchych wydawany przez PZG',
//           type: 'book',
//           url: '',
//           notes: 'To magazyn słyszaków. Nie wiadomo czy g/Głusi używali tych znaków'
//         },
//         regions: [{id: '', createdAt: 0, name: 'Kraków'}, {id: '', createdAt: 0, name: 'Warszawa'}]
//         }
//     ]

interface MeaningItemProps {
  meaningDetails: IMeaningDetails
}

function MeaningItem({meaningDetails}: MeaningItemProps): React.JSX.Element {
  const {words, sources, ...meaning} = meaningDetails
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className="meaningContainer">
      <div className="meaningItem">
        <div className='wordsContainer'>
          <div className='words'>{words.flatMap((w) => `"${w.name}"`).join(' ')}</div>
          <PillList textArray={[currencyOfSources(sources)]}/>
        </div>
        <div>
          {meaning.explanation}
          {isFormOpen ?
            <SourceForm meaningId={meaning.id} formType='add' setIsFormOpen={setIsFormOpen}/> :
            <ActionButton text="Dodaj źródło" buttonAction={() => setIsFormOpen(true)}/>
          }
        </div>
      </div>
      <div className='sourcesList'>
        {sources.map((source, key)=><SourceItem key={key} sourceDetails={source}/>)}
      </div>
    </div>
  )
}

export default MeaningItem
