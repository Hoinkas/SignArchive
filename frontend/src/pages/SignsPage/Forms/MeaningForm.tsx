import { type SubmitEvent, useState, useEffect } from 'react'
import {
  FormMultiLineInput,
  FormModalWrapper
} from '@src/components/Form/Form'
import type { IMeaningDetails, IMeaningToDB } from '@src/models/meaning.model'
import type { FormType } from '@src/models/yearStartEnd.model'
import { wordApi } from '@src/services/word.api'
import { useSign } from '@src/hooks/SignContext/useSign'
import type { DropdownOption } from '@src/components/Form/Components/DropdownOptions'
import FormTags from '@src/components/Form/Components/FormTags'

interface MeaningFormProps {
  meaning?: IMeaningDetails
  formType: FormType
  closeAction: () => void
}

function MeaningForm(props: MeaningFormProps): React.JSX.Element {
  const { meaning, formType, closeAction } = props
  const { addMeaning, editMeaning } = useSign()
  const [submitted, setSubmitted] = useState<boolean>(false)

  const [explanation, setExplanation] = useState<string>(meaning?.explanation ?? '')
  const [words, setWords] = useState<DropdownOption[]>(meaning ? meaning.words.map((w) => {return {id: w.id, label: w.name}}) : [])
  const [allWords, setAllWords] = useState<DropdownOption[]>([])

  useEffect(() => {
    wordApi.list().then((result) =>
      setAllWords(result.map((w) => ({ id: w.id, label: w.name })))
    )
  }, [])

  const closeForm = (): void => {
    setExplanation('')
    closeAction()
  }

  const isValid = explanation && words.length > 0

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const meaningToCreate: IMeaningToDB = {
      explanation: explanation
    }

    if (formType === 'add') {
      addMeaning(meaningToCreate, words, closeForm)
    } else if (formType === 'edit' && meaning) {
      const oldWords = meaning.words.map((w) => {return {id: w.id, label: w.name}})
      editMeaning(meaning.id, meaningToCreate, oldWords, words, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormTags
        label="Słowa do znaczenia"
        tagList={words}
        setTagList={setWords}
        dropdownOptions={allWords}
        required
        submitted={submitted}
      />
      <FormMultiLineInput
        label="Wyjaśnienie znaczenia"
        value={explanation}
        setValue={setExplanation}
        required
        submitted={submitted}
      />
    </FormModalWrapper>
  )
}

export default MeaningForm
