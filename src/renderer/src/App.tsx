import WordViewer from './pages/WordViewer/WordViewer'
import SidePanel from './pages/SidePanel/SidePanel'
import { useWord } from '@contexts/WordContext/useWord'

function App(): React.JSX.Element {
  const { activeWord } = useWord()

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel />
      {activeWord && <WordViewer />}
    </div>
  )
}

export default App
