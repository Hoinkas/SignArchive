import { useState } from 'react'
import SidePanel from './components/SidePanel/SidePanel'
import { Word } from '@shared/types'
import WordViewer from './components/WordViewer/WordViewer'

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [activeWord, setActiveWord] = useState<Word | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel activeWord={activeWord} setActiveWord={setActiveWord} />
      {activeWord && <WordViewer word={activeWord} />}
    </div>
  )
}

export default App
