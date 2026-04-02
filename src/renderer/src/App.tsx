import WordViewer from './pages/WordViewer/WordViewer'
import SidePanel from './pages/SidePanel/SidePanel'
import { useWord } from '@contexts/WordContext/useWord'
import SignsProvider from '@contexts/SignsContext/SignsProvider'

function App(): React.JSX.Element {
  const { activeWordId } = useWord()

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel />
      <SignsProvider>{activeWordId && <WordViewer />}</SignsProvider>
    </div>
  )
}

export default App
