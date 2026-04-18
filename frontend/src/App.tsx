import PermissionsProvider from '@src/hooks/PermissionsContext/PermissionsProvider'
import LandingPage from './pages/LandingPage/LandingPage'
import NavBar from './components/NavBar/NavBar'
import { useEffect } from 'react'
import isDarkTheme from './utils/isDarkTheme'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import SignsPage from './pages/SignsPage/SignsPage'
import SignListProvider from './hooks/SignListContext/SignListProvider'

function PageLayout() {
  return (
    <>
      <NavBar />
      <div className="pageContainer">
        <div className='page'>
          <Outlet />
        </div>
      </div>
    </>
  )
}


function App(): React.JSX.Element {
  useEffect(() =>{
    document.documentElement.setAttribute('data-theme', isDarkTheme() ? 'dark' : 'light')
  },[])

  return (
    <BrowserRouter>
      <PermissionsProvider>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signs/" element={<SignListProvider><SignsPage /></SignListProvider>} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </PermissionsProvider>
    </BrowserRouter>
  )
}

export default App
