import './SignsPage.css'
import Loader from '@src/components/Loader/Loader'
import { useSignList } from '@src/hooks/SignListContext/useSignList'
import { useEffect } from 'react'
import SignItem from './SignItem/SignItem'
import type { ISignSimple } from '@src/models/sign.model'
import { signCountText } from '@src/utils/namesHelpers'

const signs: ISignSimple[] = [
  {
    id: '',
    createdAt: 0o0,
    meaningsCount: 3,
    regions: ['Kraków', 'Warszawa'],
    years: {yearStart: 1920, yearEnd: 2026},
    words: ['Kraków', 'Katedra'],
    media: {
      id: '',
      createdAt: 0o0,
      videoUrl: '',
      mediaType: 'mp4'
    },
    notes: 'eeeeeeee'
  },
  {
    id: '',
    createdAt: 0o0,
    meaningsCount: 3,
    regions: ['Kraków', 'Warszawa'],
    years: {yearStart: 1920, yearEnd: 2026},
    words: ['Kraków', 'Katedra'],
    media: {
      id: '',
      createdAt: 0o0,
      videoUrl: '',
      mediaType: 'mp4'
    },
    notes: 'eeeeeeee'
  },
  {
    id: '',
    createdAt: 0o0,
    meaningsCount: 3,
    regions: ['Kraków', 'Warszawa'],
    years: {yearStart: 1920, yearEnd: 2026},
    words: ['Kraków', 'Katedra'],
    media: {
      id: '',
      createdAt: 0o0,
      videoUrl: '',
      mediaType: 'mp4'
    },
    notes: 'eeeeeeee'
  }
]

function SignList(): React.JSX.Element {
  const { signList, signListLoading, initiateSigns } = useSignList()

  useEffect(() => {
    initiateSigns()
  },[initiateSigns])

  if (signListLoading) return <Loader/>

  return (
    <div className="signPage">
      <>{signCountText(signs.length)} znaleziono</>
      <div className="signListContainer">
        {signs.map((sign, key) => (
          <SignItem key={key} signSimple={sign}/>
        ))}
      </div>
    </div>
  )
}

export default SignList
