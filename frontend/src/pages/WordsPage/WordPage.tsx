import SidePanel from "@src/components/SidePanel/SidePanel"
import SignsProvider from "@src/hooks/SignsContext/SignsProvider"
import WordDetails from "./WordDetails/WordDetails"

function WordPage(): React.JSX.Element {
  return (
    <div>
      <SidePanel />
      <SignsProvider>
        <WordDetails />
      </SignsProvider>
    </div>
  )
}

export default WordPage
