import { Dispatch, SetStateAction, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import './SidePanel.css'
import { Word } from '@shared/types'
import ListOfWords from './ListOfWords/ListOfWords'

interface SidePanelProps {
  activeWord: Word | null
  setActiveWord: Dispatch<SetStateAction<Word | null>>
}

function SidePanel(props: SidePanelProps): React.JSX.Element {
  const { activeWord, setActiveWord } = props
  const [searchWord, setSearchWord] = useState('')

  return (
    <div className="sidepanel">
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <ListOfWords searchWord={searchWord} activeWord={activeWord} setActiveWord={setActiveWord} />
    </div>
  )
}

export default SidePanel
