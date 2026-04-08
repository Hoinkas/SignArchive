import { useTags } from '@src/hooks/TagsContext/useTags'
import type { ITag } from '@src/models/tag.model'

interface TagProps {
  tag: ITag
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
