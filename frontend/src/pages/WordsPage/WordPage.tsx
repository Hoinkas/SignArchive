import SidePanel from "@src/components/SidePanel/SidePanel"
import SignsProvider from "@src/hooks/SignsContext/SignsProvider"
import WordDetails from "./WordDetails/WordDetails"
import { useParams } from "react-router-dom"
import { useWord } from "@src/hooks/WordContext/useWord"
import { useEffect } from "react"
import { titleCase } from "@src/utils/namesHelpers"
import PageNotFound from "../PageNotFound/PageNotFound"

function WordPage(): React.JSX.Element {
  const { word } = useParams()
  const { setActiveWordByName, error } = useWord()

  useEffect(() => {
    setActiveWordByName(titleCase(word ?? ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word])

  if (error) return <PageNotFound/>

  return (
    <div style={{display: 'flex'}}>
      <SidePanel />
      <SignsProvider>
        <WordDetails />
      </SignsProvider>
    </div>
  )
}

export default WordPage
