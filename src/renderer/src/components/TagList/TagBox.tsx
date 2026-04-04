import { Tag } from '@shared/types'
import { useTags } from '@contexts/TagsContext/useTags'

interface TagProps {
  tag: Tag
}

function TagBox({ tag }: TagProps): React.JSX.Element {
  const { deleteTag } = useTags()

  return (
    <div className="tag">
      {tag.name}
      <button type="button" onClick={() => deleteTag(tag)}>
        x
      </button>
    </div>
  )
}

export default TagBox
