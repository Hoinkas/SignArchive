import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import NavBar from './components/NavBar/NavBar'
import SignListProvider from './hooks/SignListContext/SignListProvider'
import SignsPage from './pages/SignsPage/SignsPage'

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
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<SignListProvider><SignsPage/></SignListProvider>}/>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
