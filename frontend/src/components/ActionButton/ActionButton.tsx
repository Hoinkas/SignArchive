import './ActionButton.css'

interface ActionButtonProps {
  text: string
  buttonAction: () => void
  isAtEnd?: boolean
  isPrimary?: boolean
}

function ActionButton(props: ActionButtonProps): React.JSX.Element {
  const { text, buttonAction, isAtEnd = false, isPrimary = false } = props

  return (
    <button className={`${isAtEnd  ? 'isAtEnd' : ''} ${isPrimary  ? 'primary' : ''}`} onClick={buttonAction}>
      {text}
    </button>
  )
}

export default ActionButton
