import { Dispatch, SetStateAction } from 'react'
import PillBox from './PillBox/PillBox'
import './PillBoxList.css'

interface PillBoxListProps {
  textArray: string[]
  setTags?: Dispatch<SetStateAction<string[]>>
}

function PillBoxList(props: PillBoxListProps): React.JSX.Element {
  const { textArray, setTags } = props

  return (
    <div className="pillBoxList">
      {textArray.map((text, key) => (
        <PillBox key={key} text={text} setTags={setTags} />
      ))}
    </div>
  )
}

export default PillBoxList
