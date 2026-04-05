import { useWord } from '@contexts/WordContext/useWord'
import './ListOfWords.css'
import WordItem from './WordItem/WordItem'
import { DropdownOption } from '@renderer/components/Form/Components/FormDropdown'
import { WordWithCountCategories } from '@shared/types'

interface ListOfWordsProps {
  searchWord: string
  tagOption: DropdownOption | null
}

function ListOfWords({ searchWord, tagOption }: ListOfWordsProps): React.JSX.Element {
  const { wordsList } = useWord()

  function filterBySearch(words: WordWithCountCategories[]): WordWithCountCategories[] {
    if (searchWord == '') return words
    return words.filter((w) => w.text.toUpperCase().includes(searchWord.toUpperCase()))
  }

  function filterByTags(words: WordWithCountCategories[]): WordWithCountCategories[] {
    if (!tagOption) return words
    return words.filter((w) => w.categories.find((c) => c.id === tagOption.id))
  }

  const wordsToList = filterByTags(filterBySearch(wordsList))

  return (
    <ul className="listOfWords">
      {wordsToList.map((word, key) => (
        <WordItem key={key} word={word} />
      ))}
    </ul>
  )
}

export default ListOfWords
