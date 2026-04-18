import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import NavBar from './components/NavBar/NavBar'
import { useEffect } from 'react'
import isDarkTheme from './utils/isDarkTheme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import SignsPage from './pages/SignsPage/SignsPage'
import SignsProvider from './hooks/SignsContext/SignsProvider'

function App(): React.JSX.Element {
  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light')
  },[])

  return (
    <BrowserRouter>
      <PermissionsProvider>
        <NavBar/>

        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signs/" element={<SignsProvider><SignsPage/></SignsProvider>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </PermissionsProvider>
    </BrowserRouter>
  )
}

export default App
