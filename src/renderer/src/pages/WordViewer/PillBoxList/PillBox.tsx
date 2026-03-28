import { Dispatch, SetStateAction } from 'react'

interface PillBoxProps {
  text: string
  setTags?: Dispatch<SetStateAction<string[]>>
}

function PillBox(props: PillBoxProps): React.JSX.Element {
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

export default PillBox
