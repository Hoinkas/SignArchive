import { useWord } from '@src/hooks/WordContext/useWord'
import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import WordPage from './pages/WordsPage/WordPage'
import NavBar from './components/NavBar/NavBar'
import { useEffect } from 'react'
import isDarkTheme from './utils/isDarkTheme'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { titleCase } from './utils/namesHelpers'
import Loader from './assets/animations/Loader'

function Word(): React.JSX.Element {
  const { word } = useParams()
  const { setActiveWordByName, error } = useWord()

  useEffect(() => {
    setActiveWordByName(titleCase(word ?? ''))
  }, [setActiveWordByName, word])

  if (error) return <div>{error}</div>
  return <WordPage />
}

function App(): React.JSX.Element {
  const { loading, error } = useWord()

  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light')
  })

  if (loading) return <div><Loader/></div>
  if (error) return <div className="error">{error}</div>

  return (
    <BrowserRouter>
      <PermissionsProvider>
        <NavBar/>

        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path={`/word/:word`} element={<Word/>} />
        </Routes>
      </PermissionsProvider>
    </BrowserRouter>
  )
}

export default App
