import { Dispatch, SetStateAction } from 'react'

interface TagProps {
  text: string
  index?: number
  setTags?: Dispatch<SetStateAction<string[]>>
}

function Tag(props: TagProps): React.JSX.Element {
  const { text, setTags, index } = props

  const handleTagDelete = (): void => {
    if (!setTags) return
    setTags((prevState) => prevState.filter((_, i) => i !== index))
  }

  return (
    <div className="tag">
      {text}
      {setTags && (
        <button type="button" onClick={() => handleTagDelete()}>
          x
        </button>
      )}
    </div>
  )
}

export default Tag
