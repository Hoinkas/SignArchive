
import type { IYearStartEnd } from '@src/models/yearStartEnd.model';
import { mergeYearToText } from '@src/utils/namesHelpers';
import './YearsDiagram.css'

interface IProps {
    dotYears: IYearStartEnd
    minMaxYear: IYearStartEnd
}

function TimelineDot({ dotYears, minMaxYear }: IProps): React.JSX.Element {
    const yearDifference = dotYears.yearEnd ? dotYears.yearEnd - (dotYears.yearStart ?? 0) : 0
    const totalYearsPassed = (minMaxYear.yearEnd ?? 0) - (minMaxYear.yearStart ?? 0);
    const widthPct = (yearDifference / totalYearsPassed) * 100
    const leftPct = (((dotYears.yearStart ?? 0) - (minMaxYear.yearStart ?? 0)) / totalYearsPassed) * 100

    return (
        <div className='yearLine' style={{ left: `calc(${leftPct}% - 12px)`, width: `calc(${widthPct}% + 12px)` }}>
            <div className='yearText'>
                {mergeYearToText(dotYears)}
            </div>
        </div>
    )
}

export default TimelineDot
