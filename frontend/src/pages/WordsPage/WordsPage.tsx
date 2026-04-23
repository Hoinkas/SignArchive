import './WordsPage.css'
import type { IWordAttached } from '@src/models/word.model'
import Loader from '@src/components/Loader/Loader'
import { useEffect, useState } from 'react'
import { wordApi } from '@src/services/word.api'
import { useSearch } from '@src/hooks/SearchContext/useSearch'

function WordsPage(): React.JSX.Element {
  const [wordList, setWordList] = useState<IWordAttached[]>([])
  const [wordListLoading, setWordListLoading] = useState<boolean>(true)
  const {handleNameChange} = useSearch()

  useEffect(() => {
    wordApi.list()
      .then((data) => setWordList(data))
      .catch((err) => {
        console.error(err)
      })
      .finally(() => setWordListLoading(false))
  }, [])

  if (wordListLoading) return <Loader/>

  return (
    <div className="wordsPage page">
      {wordList.map((w) =>
        <div className='tag wordItem' onClick={() => handleNameChange(w.name)}>{w.name}</div>
      )}
    </div>
  )
}

export default WordsPage
