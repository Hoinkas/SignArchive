
import type { IYearStartEnd } from '@src/models/yearStartEnd.model';
import './WordTimeline.css'
import { useSignList } from '@src/hooks/SignListContext/useSignList';
import { returnMarginalYears } from '@src/utils/calculateStatistics';
import TimelineDot from '../TimeLineDot/TimelineDot';

interface IProps {
    word: string
    years: IYearStartEnd[]
}

function WordTimeline({ word, years }: IProps): React.JSX.Element {
    const { allSigns } = useSignList()
    const minMaxYear = returnMarginalYears(allSigns.flatMap((s) => s.years))

    return (
        <div className='wordTimeContainer'>
            <div>[{word}]</div>
            <div className='linesContainer'>
                <div className='line'/>
                {years.map((item, i) => <TimelineDot key={i} dotYears={item} minMaxYear={minMaxYear}/>)}
            </div>
        </div>
    )
}

export default WordTimeline
