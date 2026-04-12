import { useWord } from '@src/hooks/WordContext/useWord'
import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import WordPage from './pages/WordsPage/WordPage'
import NavBar from './components/NavBar/NavBar'
import { useEffect } from 'react'
import isDarkTheme from './utils/isDarkTheme'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { titleCase } from './utils/namesHelpers'
import { WORD_FRAGMENT } from './utils/baseUrl.helper'

function Word(): React.JSX.Element {
  const { word } = useParams()
  const { setActiveWordByName } = useWord()

  return setActiveWordByName(titleCase(word)) ? <WordPage /> : <div>Error</div>
}

function App(): React.JSX.Element {
  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light')
  })

  return (
    <BrowserRouter>
      <PermissionsProvider>
        <NavBar/>

        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path={`${WORD_FRAGMENT}/:word`} element={<Word/>} />
        </Routes>
      </PermissionsProvider>
    </BrowserRouter>
  )
}

export default App
