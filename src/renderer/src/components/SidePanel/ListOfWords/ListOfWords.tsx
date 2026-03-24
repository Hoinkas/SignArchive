import './ListOfWords.css'
import WordItem from './WordItem/WordItem'
import { Word, WordWithSignCount } from '@shared/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ListOfWordsProps {
  searchWord: string
  activeWord: Word | null
  setActiveWord: Dispatch<SetStateAction<Word | null>>
}

function ListOfWords(props: ListOfWordsProps): React.JSX.Element {
  const { searchWord, activeWord, setActiveWord } = props
  const [wordsWithSignCount, setWordsWithSignCount] = useState<WordWithSignCount[]>([])

  useEffect(() => {
    window.api.words.list_signs_count().then(setWordsWithSignCount)
  }, [])

  const wordFiltered = wordsWithSignCount.filter((w) =>
    w.text.toUpperCase().includes(searchWord.toUpperCase())
  )
  const wordsToList = searchWord == '' ? wordsWithSignCount : wordFiltered

  console.log(wordsToList.length)

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
