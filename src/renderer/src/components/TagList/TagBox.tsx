import { useWord } from '@contexts/WordContext/useWord'
import { Dispatch, SetStateAction } from 'react'
import { Tag } from '@shared/types'

interface TagProps {
  tag: Tag
  setTags: Dispatch<SetStateAction<Tag[]>>
}

function TagBox({ tag, setTags }: TagProps): React.JSX.Element {
  const { deleteTag } = useWord()

  const handleTagDelete = (): void => {
    if (!setTags) return
    deleteTag(tag)
    setTags((prevState) => prevState.filter((t) => t.id !== tag.id))
  }

  return (
    <div className="tag">
      {tag.name}
      <button type="button" onClick={() => handleTagDelete()}>
        x
      </button>
    </div>
  )
}

export default TagBox
