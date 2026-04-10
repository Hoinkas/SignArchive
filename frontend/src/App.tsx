import { useWord } from '@src/hooks/WordContext/useWord'
import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import WordPage from './pages/WordsPage/WordPage'
import NavBar from './components/NavBar/NavBar'
import { useEffect } from 'react'
import isDarkTheme from './utils/isDarkTheme'

function App(): React.JSX.Element {
  const { activeWordId } = useWord()

  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light')
  })

  return (
    <PermissionsProvider>
      <NavBar/>
        {activeWordId ? <WordPage/> : <LandingPage/>}
    </PermissionsProvider>
  )
}

export default App
