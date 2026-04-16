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
import SignsProvider from './hooks/SignsContext/SignsProvider'

function App(): React.JSX.Element {
  const { wordListLoading } = useWord()

  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light')
  },[])

  if (wordListLoading) return <div style={{width: '100vw', height: '100vh'}}><Loader/></div>

  return (
    <BrowserRouter>
      <PermissionsProvider>
        <NavBar/>

        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path={`/word/:word`} element={<SignsProvider><WordPage/></SignsProvider>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </PermissionsProvider>
    </BrowserRouter>
  )
}

export default App
