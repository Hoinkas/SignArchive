import { Dispatch, SetStateAction, useState } from 'react'
// import './ComparsionBox.css'
import { SignWithSourceSignerMediaFile } from '@shared/types'
import ComparsionWindow from './ComparsionWindow/ComparsionWindow'

interface ComparsionBoxProps {
  activeSigns: SignWithSourceSignerMediaFile[]
  setIsComparsionActive: Dispatch<SetStateAction<boolean>>
}

function ComparsionBox(props: ComparsionBoxProps): React.JSX.Element {
  const { activeSigns, setIsComparsionActive } = props
  const [isComparsionWindowOpen, setIsComparsionWindowOpen] = useState<boolean>(false)

  return (
    <div className="ComparsionBox">
      <div>Zaznaczono: {activeSigns.length} wariantów</div>
      <div>
        <button type="reset" onClick={() => setIsComparsionActive(false)}>
          Anuluj
        </button>
        <button
          type="submit"
          onClick={() => setIsComparsionWindowOpen(true)}
          disabled={activeSigns.length <= 1}
        >
          Porównaj
        </button>
      </div>
      {isComparsionWindowOpen && (
        <ComparsionWindow
          activeSigns={activeSigns}
          setIsComparsionWindowOpen={setIsComparsionWindowOpen}
        />
      )}
    </div>
  )
}

export default ComparsionBox
