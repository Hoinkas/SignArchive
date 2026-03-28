import { Dispatch, SetStateAction, SubmitEvent, useState } from 'react'
import { FormType, Meaning } from '@shared/types'
import {
  FormButtons,
  FormMultiLineInput,
  FormSingleLineInput,
  FormWrapper
} from '@renderer/components/WordForm/Form'

interface MeaningFormProps {
  wordId?: string
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

    if (formType == 'add' && wordId) {
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
    <FormWrapper handleSubmit={handleSubmit}>
      <FormSingleLineInput label={'Znaczenie'} value={context} setValue={setContext} />
      <FormMultiLineInput label={'Definicja'} value={notes} setValue={setNotes} />
      <FormButtons formType={formType} closeForm={closeForm} />
    </FormWrapper>
  )
}

export default MeaningForm
