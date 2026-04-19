import { type SubmitEvent, type Dispatch, type SetStateAction, useState } from 'react'
import {
  FormMultiLineInput,
  FormModalWrapper
} from '@src/components/Form/Form'
import type { IMeaningAttached, IMeaningToDB } from '@src/models/meaning.model'
import type { FormType } from '@src/models/yearStartEnd.model'
import { useMeaningList } from '@src/hooks/MeaningListContext/useMeaningList'

interface MeaningFormProps {
  meaning?: IMeaningAttached
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function MeaningForm(props: MeaningFormProps): React.JSX.Element {
  const { meaning, formType, setIsFormOpen } = props
  const { addMeaning, editMeaning } = useMeaningList()

  const [explanation, setexplanation] = useState<string>(meaning ? meaning.explanation : null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const closeForm = (): void => {
    setexplanation('')
    setIsFormOpen(false)
  }

  const isValid = explanation

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const meaningToCreate: IMeaningToDB = {
      explanation: explanation !== '' ? explanation : undefined
    }

    if (formType === 'add') {
      addMeaning(meaningToCreate, closeForm)
    } else if (formType === 'edit' && meaning) {
      editMeaning(meaning.id, meaningToCreate, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMultiLineInput
        label="Wyjaśnienie znaczenia"
        value={explanation}
        setValue={setexplanation}
        required
        submitted={submitted}
      />
    </FormModalWrapper>
  )
}

export default MeaningForm
