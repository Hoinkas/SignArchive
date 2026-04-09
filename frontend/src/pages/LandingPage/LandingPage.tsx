import { useWord } from '@src/hooks/WordContext/useWord'
import './LandingPage.css'
import SearchProvider from '@src/hooks/SearchCotext/SearchProvider'
import SidePanel from '@src/components/SidePanel/SidePanel'

function LandingPage(): React.JSX.Element {
  const {allWords} = useWord()

  return (
    <div>
      <SearchProvider>
        <SidePanel />
      </SearchProvider>
      <div className='landingPage'>
        <h1>ZnakoTeka</h1>
        <p>{allWords.length} znaków</p>
      </div>
    </div>
  )
}

export default LandingPage
