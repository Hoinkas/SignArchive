import { Dispatch, SetStateAction } from 'react'
import './TagList.css'
import { Tag } from '@shared/types'
import TagBox from './TagBox'

interface TagListProps {
  tags: Tag[]
  setTags: Dispatch<SetStateAction<Tag[]>>
}

function TagList({ tags, setTags }: TagListProps): React.JSX.Element {
  return (
    <div className="tagList">
      {tags.map((tag, key) => (
        <TagBox key={key} tag={tag} setTags={setTags} />
      ))}
    </div>
  )
}

export default TagList
