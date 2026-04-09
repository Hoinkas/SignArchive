import { useWord } from '@src/hooks/WordContext/useWord'
import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import WordPage from './pages/WordsPage/WordPage'
import NavBar from './components/NavBar/NavBar'

function App(): React.JSX.Element {
  const { activeWordId } = useWord()

  return (
    <PermissionsProvider>
      <NavBar/>
      <div style={{ display: 'flex' }}>
        {activeWordId ? <WordPage/> : <LandingPage/>}
      </div>
    </PermissionsProvider>
  )
}

export default App
