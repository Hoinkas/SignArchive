import { useWord } from '@contexts/WordContext/useWord'
import './ListOfWords.css'
import WordItem from './WordItem/WordItem'

interface ListOfWordsProps {
  searchWord: string
}

function ListOfWords(props: ListOfWordsProps): React.JSX.Element {
  const { searchWord } = props
  const { wordsList } = useWord()

  const wordFiltered = wordsList.filter((w) =>
    w.text.toUpperCase().includes(searchWord.toUpperCase())
  )
  const wordsToList = searchWord == '' ? wordsList : wordFiltered

  return (
    <ul className="listOfWords">
      {wordsToList.map((word, key) => (
        <WordItem key={key} word={word} />
      ))}
    </ul>
  )
}

export default ListOfWords
