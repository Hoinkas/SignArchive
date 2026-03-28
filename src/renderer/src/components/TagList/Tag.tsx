import { Dispatch, SetStateAction } from 'react'

interface TagProps {
  text: string
  setTags?: Dispatch<SetStateAction<string[]>>
}

function Tag(props: TagProps): React.JSX.Element {
  const { text, setTags } = props

  const handleTagDelete = (): void => {
    if (setTags === undefined) return
    setTags((prevState) => prevState.filter((tag) => tag !== text))
  }

  return (
    <div className="tag">
      {text} {setTags && <button onClick={() => handleTagDelete()}>x</button>}
    </div>
  )
}

export default Tag
