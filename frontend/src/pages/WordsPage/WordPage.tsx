import SidePanel from "@src/components/SidePanel/SidePanel"
import SearchProvider from "@src/hooks/SearchCotext/SearchProvider"
import SignsProvider from "@src/hooks/SignsContext/SignsProvider"
import WordDetails from "./WordDetails/WordDetails"

function WordPage(): React.JSX.Element {
  return (
    <div>
      <SearchProvider>
        <SidePanel />
      </SearchProvider>
      <SignsProvider>
        <WordDetails />
      </SignsProvider>
    </div>
  )
}

export default WordPage
