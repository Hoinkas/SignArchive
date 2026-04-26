import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import NavBar from './components/NavBar/NavBar'
import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import SignsPage from './pages/SignsPage/SignsPage'
import SignListProvider from './hooks/SignListContext/SignListProvider'
import SearchBar from './components/SearchBar/SearchBar'
import SearchProvider from './hooks/SearchContext/SearchProvider'
import WordsPage from './pages/WordsPage/WordsPage'
import isLightTheme from './utils/isLightTheme'
import InfoPage from './pages/InfoPage/LandingPage'

function PageLayout() {
  return (
    <>
      <NavBar />
      <SearchBar/>
      <div className="pageContainer">
        <Outlet />
      </div>
    </>
  )
}


function App(): React.JSX.Element {
  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isLightTheme() ? 'light' : 'dark')
  },[])

  return (
    <BrowserRouter>
      <PermissionsProvider>
        <SearchProvider>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<SignListProvider><SignsPage /></SignListProvider>} />
              <Route path="/signs/" element={<SignListProvider><SignsPage /></SignListProvider>} />
              <Route path="/info/" element={<InfoPage />} />
              <Route  path="/words/" element={<WordsPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </SearchProvider>
      </PermissionsProvider>
    </BrowserRouter>
  )
}

export default App
