import { useWord } from '@src/hooks/WordContext/useWord'
import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import WordPage from './pages/WordsPage/WordPage'
import NavBar from './components/NavBar/NavBar'
import { useEffect } from 'react'
import isDarkTheme from './utils/isDarkTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './components/Loader/Loader'
import PageNotFound from './pages/PageNotFound/PageNotFound'

function App(): React.JSX.Element {
  const { loading } = useWord()

  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light')
  })

  if (loading) return <div><Loader/></div>

  return (
    <BrowserRouter>
      <PermissionsProvider>
        <NavBar/>

        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path={`/word/:word`} element={<WordPage/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </PermissionsProvider>
    </BrowserRouter>
  )
}

export default App
