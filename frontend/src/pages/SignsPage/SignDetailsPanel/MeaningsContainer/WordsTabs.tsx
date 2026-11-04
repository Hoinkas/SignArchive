
import './MeaningsContainer.css'

interface IProps {
    words: string[]
    activeWord: string
    setActiveWord: React.Dispatch<React.SetStateAction<string>>
}

function WordsTabs({words, activeWord, setActiveWord}: IProps): React.JSX.Element {

    return (
        <div style={{display: 'flex'}}>
            {words.map((w) => {
                const className = [
                "wordTab",
                activeWord === w ? " active" : "",
                ].join("")

                return <div className={className} onClick={() => setActiveWord(w)}>{w}</div>
            })}
        </div>
    )
}

export default WordsTabs
