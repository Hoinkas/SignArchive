import { Dispatch, SetStateAction } from 'react'
import './AddSign.css'

interface AddSignProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function AddSign({ setIsFormOpen }: AddSignProps): React.JSX.Element {
  return (
    <div className="addSignContainer" onClick={() => setIsFormOpen(true)}>
      <div className="addSignCircle">+</div>
      <div>wariant</div>
    </div>
  )
}

export default AddSign
