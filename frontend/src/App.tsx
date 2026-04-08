import WordViewer from './pages/WordViewer/WordViewer'
import SidePanel from './pages/SidePanel/SidePanel'
import { useWord } from '@contexts/WordContext/useWord'
import SignsProvider from '@contexts/SignsContext/SignsProvider'
import SearchProvider from '@contexts/SearchCotext/SearchProvider'
import PermissionsProvider from '@contexts/PermissionsContext/PermissionsProvider'

function App(): React.JSX.Element {
  const { activeWordId } = useWord()

  return (
    <PermissionsProvider>
      <div style={{ display: 'flex' }}>
        <SearchProvider>
          <SidePanel />
        </SearchProvider>
        <SignsProvider>{activeWordId && <WordViewer />}</SignsProvider>
      </div>
    </PermissionsProvider>
  )
}

export default App
