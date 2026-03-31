import { Dispatch, SetStateAction } from 'react'
import Tag from './Tag'
import './TagList.css'

interface TagListProps {
  textArray: string[]
  setTags?: Dispatch<SetStateAction<string[]>>
}

function TagList(props: TagListProps): React.JSX.Element {
  const { textArray, setTags } = props

  return (
    <div className="tagList">
      {textArray.map((text, key) => (
        <Tag key={key} text={text} setTags={setTags} />
      ))}
    </div>
  )
}

export default TagList
