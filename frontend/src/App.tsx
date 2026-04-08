import WordViewer from './pages/WordViewer/WordViewer'
import SidePanel from './pages/SidePanel/SidePanel'
import { useWord } from '@src/hooks/WordContext/useWord'
import SignsProvider from '@src/hooks/SignsContext/SignsProvider'
import SearchProvider from '@src/hooks/SearchCotext/SearchProvider'
import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'

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
