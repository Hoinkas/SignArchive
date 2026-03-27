import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import './MeaningForm.css'
import { FormType, Meaning } from '@shared/types'

interface MeaningFormProps {
  wordId: string
  meaning?: Meaning
  setMeaningValues: (meaning: Meaning) => void
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function MeaningForm(props: MeaningFormProps): React.JSX.Element {
  const { wordId, meaning, setMeaningValues, formType, setIsFormOpen } = props

  const [context, setContext] = useState<string>(meaning?.context || '')
  const [notes, setNotes] = useState<string>(meaning?.notes || '')

  const closeForm = (): void => {
    setContext('')
    setNotes('')
    setIsFormOpen(false)
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (formType == 'add') {
      window.api.meaning
        .create({ wordId, context, notes })
        .then((meaning) => setMeaningValues(meaning))
    } else if (formType == 'edit' && meaning) {
      window.api.meaning
        .update(meaning.id, { context, notes })
        .then((meaning) => setMeaningValues(meaning))
    }

    closeForm()
  }

  return (
    <div className="formContainer">
      {formType === 'edit' && <h2>{context}</h2>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Znaczenie</label>
          <input type="text" value={context} onChange={(event) => setContext(event.target.value)} />
        </div>
        <div className="formGroup">
          <label>Definicja</label>
          <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
        </div>
        <div className="buttonGroup">
          <button type="submit">{formType === 'edit' ? 'Zapisz słowo' : 'Dodaj słowo'}</button>
          <button type="reset" onClick={() => closeForm()}>
            Anuluj
          </button>
        </div>
      </form>
    </div>
  )
}

export default MeaningForm
