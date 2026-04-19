import './SignDetailsInfo.css'
import { useSign } from '@src/hooks/SignContext/useSign'
import ActionButton from '@src/components/ActionButton/ActionButton'
import MediaPlayer from '../../SingList/SignItem/MediaPlayer/MediaPlayer'
import SignInfo from '../../SignInfo/SignInfo'
import { useState } from 'react'
import MeaningForm from '@src/components/Form/Forms/MeaningForm'

function SignDetailsInfo(): React.JSX.Element {
  const { sign, simpleSign } = useSign()
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <div className='signDetailsInfo'>
      <MediaPlayer media={sign.media}/>
      <SignInfo signSimple={simpleSign}/>
      {isFormOpen ?
        <MeaningForm formType='add' setIsFormOpen={setIsFormOpen}/> :
        <ActionButton text="Dodaj znaczenie" buttonAction={() => setIsFormOpen(true)}/>
      }
    </div>
  )
}

export default SignDetailsInfo
