import { useState } from 'react'
import { SignWithSourceSignerMediaFile } from '@shared/types'
import ComparsionWindow from './ComparsionWindow/ComparsionWindow'

interface ComparsionBoxProps {
  activeSigns: SignWithSourceSignerMediaFile[]
  handleCloseComparsionWindow: () => void
}

function ComparsionBox(props: ComparsionBoxProps): React.JSX.Element {
  const { activeSigns, handleCloseComparsionWindow } = props
  const [isComparsionWindowOpen, setIsComparsionWindowOpen] = useState<boolean>(false)

  const handleCloseWindow = (): void => {
    handleCloseComparsionWindow()
    setIsComparsionWindowOpen(false)
  }

  return (
    <div className="comparsionBox">
      <div>Zaznaczono: {activeSigns.length} wariantów. Można maksymalnie 2</div>
      <div>
        <button type="reset" onClick={() => handleCloseWindow()}>
          Anuluj
        </button>
        <button
          type="submit"
          onClick={() => setIsComparsionWindowOpen(true)}
          disabled={activeSigns.length !== 2}
        >
          Porównaj
        </button>
        {isComparsionWindowOpen && (
          <ComparsionWindow activeSigns={activeSigns} handleCloseWindow={handleCloseWindow} />
        )}
      </div>
    </div>
  )
}

export default ComparsionBox
