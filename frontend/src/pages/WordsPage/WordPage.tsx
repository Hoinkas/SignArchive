import SidePanel from "@src/components/SidePanel/SidePanel"
import WordDetails from "./WordDetails/WordDetails"
import { useParams } from "react-router-dom"
import { useWord } from "@src/hooks/WordContext/useWord"
import { useEffect } from "react"
import { titleCase } from "@src/utils/namesHelpers"
import PageNotFound from "../PageNotFound/PageNotFound"
import { useSigns } from "@src/hooks/SignsContext/useSigns"

function WordPage(): React.JSX.Element {
  const { word } = useParams()
  const { initiateSigns } = useSigns()
  const { setActiveWordByName, error } = useWord()

  useEffect(() => {
    const wordId = setActiveWordByName(titleCase(word ?? ''))

    if (!wordId) return
    initiateSigns(wordId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word])

  if (error) return <PageNotFound/>

  return (
    <div style={{display: 'flex'}}>
      <SidePanel />
      <WordDetails />
    </div>
  )
}

export default WordPage
