import './TagList.css'
import TagBox from './TagBox'
import { useTags } from '@src/hooks/TagsContext/useTags'

function TagList(): React.JSX.Element {
  const { tags } = useTags()

  return (
    <div className="tagList">
      {tags.map((tag, key) => (
        <TagBox key={key} tag={tag} />
      ))}
    </div>
  )
}

export default TagList
