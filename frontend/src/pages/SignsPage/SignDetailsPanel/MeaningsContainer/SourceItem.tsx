
import type { ISourceToFE } from '@src/models/source.model';
import './MeaningsContainer.css'
import { mergeYearsToText } from '@src/utils/namesHelpers';

interface IProps {
  index: number
  source: ISourceToFE
}

function SourceItem({index, source}: IProps): React.JSX.Element {
  const {yearStart, yearEnd, reference, regions, notes} = source;
  const paddedNumber = (index + 1 + "").padStart(3, "0");

  return (
    <div className='meaningDetails'>
      <div className='detailsManyInRow'>
        <div>NUMER: #{paddedNumber}</div>
        <div>LATA: {mergeYearsToText(yearStart, yearEnd)}</div>
      </div>
      <div className='complexDetails'>
        <div className='detailSmall'>ŹRÓDŁO: {reference.name}</div>
        <div className='detailSmall'>REGIONY: {regions.length > 0 ? regions.flatMap((r) => r.name).join(', ') : '-'}</div>
        <div className='detailLarge'>NOTATKI: {notes || '-'}</div>
        <div className='detailLarge'>PEŁNE ŹRÓDŁO: {reference.url || reference.fullName}</div>
      </div>
    </div>
  )
}

export default SourceItem
