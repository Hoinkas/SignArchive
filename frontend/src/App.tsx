import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import NavBar from './components/NavBar/NavBar'
import SignListProvider from './hooks/SignListContext/SignListProvider'
import SignsPage from './pages/SignsPage/SignsPage'
import SearchProvider from './hooks/SearchContext/SearchProvider'

function PageLayout() {
  return (
    <>
      <NavBar />
      <div className="pageContainer">
        <Outlet />
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<SignListProvider><SignsPage/></SignListProvider>}/>
            <Route path="/signs" element={<SignListProvider><SignsPage/></SignListProvider>}/>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App
