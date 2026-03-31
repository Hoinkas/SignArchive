import { useState } from 'react'
import { Word } from '@shared/types'
import WordViewer from './pages/WordViewer/WordViewer'
import SidePanel from './pages/SidePanel/SidePanel'

function App(): React.JSX.Element {
  const [activeWord, setActiveWord] = useState<Word | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel activeWord={activeWord} setActiveWord={setActiveWord} />
      {activeWord && <WordViewer word={activeWord} />}
    </div>
  )
}

export default App
