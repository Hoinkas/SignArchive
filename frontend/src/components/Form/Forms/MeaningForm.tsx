import { type SubmitEvent, type Dispatch, type SetStateAction, useState, useEffect } from 'react'
import {
  FormMultiLineInput,
  FormModalWrapper
} from '@src/components/Form/Form'
import type { IMeaningDetails, IMeaningToDB } from '@src/models/meaning.model'
import type { FormType } from '@src/models/yearStartEnd.model'
import { useMeaningList } from '@src/hooks/MeaningListContext/useMeaningList'
import type { DropdownOption } from '../Components/DropdownOptions'
import FormTags from '../Components/FormTags'
import { wordApi } from '@src/services/word.api'

interface MeaningFormProps {
  meaning?: IMeaningDetails
  formType: FormType
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function MeaningForm(props: MeaningFormProps): React.JSX.Element {
  const { meaning, formType, setIsFormOpen } = props
  const { addMeaning, editMeaning } = useMeaningList()
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
      addMeaning(meaningToCreate, words, closeForm)
    } else if (formType === 'edit' && meaning) {
      const oldWords = meaning.words.map((w) => {return {id: w.id, label: w.name}})
      editMeaning(meaning.id, meaningToCreate, oldWords, words, closeForm)
    }
  }

  return (
    <FormModalWrapper handleSubmit={handleSubmit} formType={formType} closeForm={closeForm}>
      <FormMultiLineInput
        label="Wyjaśnienie znaczenia"
        value={explanation}
        setValue={setExplanation}
        required
        submitted={submitted}
      />
      <FormTags
        label="Słowa do znaczenia"
        tagList={words}
        setTagList={setWords}
        dropdownOptions={allWords}
        required
        submitted={submitted}
      />
    </FormModalWrapper>
  )
}

export default MeaningForm
