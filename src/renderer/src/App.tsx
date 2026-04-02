import WordViewer from './pages/WordViewer/WordViewer'
import SidePanel from './pages/SidePanel/SidePanel'
import { useWord } from '@contexts/WordContext/useWord'

function App(): React.JSX.Element {
  const { activeWordId } = useWord()

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel />
      {activeWordId && <WordViewer />}
    </div>
  )
}

export default App
