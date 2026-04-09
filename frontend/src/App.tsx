import { useWord } from '@src/hooks/WordContext/useWord'
import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import WordPage from './pages/WordsPage/WordPage'
import NavBar from './components/NavBar/NavBar'
import WordProvider from './hooks/WordContext/WordProvider'

function App(): React.JSX.Element {
  const { activeWordId } = useWord()

  return (
    <PermissionsProvider>
      <NavBar/>
      <WordProvider>
        {activeWordId ? <WordPage/> : <LandingPage/>}
      </WordProvider>
    </PermissionsProvider>
  )
}

export default App
