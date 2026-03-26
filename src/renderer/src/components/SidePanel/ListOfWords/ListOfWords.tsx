import './ListOfWords.css'
import WordItem from './WordItem/WordItem'
import { Word, WordWithCounts } from '@shared/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ListOfWordsProps {
  searchWord: string
  activeWord: Word | null
  setActiveWord: Dispatch<SetStateAction<Word | null>>
}

function ListOfWords(props: ListOfWordsProps): React.JSX.Element {
  const { searchWord, activeWord, setActiveWord } = props
  const [wordsWithSignCount, setWordsWithSignCount] = useState<WordWithCounts[]>([])

  useEffect(() => {
    window.api.word.listWithCount().then((result) => {
      setWordsWithSignCount(result.sort((a, b) => b.signCount - a.signCount))
    })
  }, [])

  const wordFiltered = wordsWithSignCount.filter((w) =>
    w.text.toUpperCase().includes(searchWord.toUpperCase())
  )
  const wordsToList = searchWord == '' ? wordsWithSignCount : wordFiltered

  return (
    <ul className="listOfWords">
      {wordsToList.map((word, key) => (
        <WordItem
          key={key}
          word={word}
          isActive={word.id === activeWord?.id}
          setActiveWord={setActiveWord}
        />
      ))}
    </ul>
  )
}

export default ListOfWords
