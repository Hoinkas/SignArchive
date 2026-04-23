interface PillListProps {
  textArray: string[]
}

function PillList({ textArray }: PillListProps): React.JSX.Element {
  return (
    <div className="defaultInline">
      {textArray.map((text, key) => (
        <div key={key} className="tag">
          {text}
        </div>
      ))}
    </div>
  )
}

export default PillList
