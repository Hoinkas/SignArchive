import { Dispatch, SetStateAction } from 'react'
import './PillBox.css'

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
    <div className="pillBox">
      {' '}
      {text} {setTags && <button onClick={() => handleTagDelete()}>x</button>}
    </div>
  )
}

export default PillBox
