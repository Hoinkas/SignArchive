import type { ReferenceType } from '@src/models/reference.model'

export interface DropdownOption {
  id: string
  label: string
}

export const REFERENCE_TYPES: ReferenceType[] = ['book', 'personal', 'url']

export const evidencesTypes: DropdownOption[] = REFERENCE_TYPES.map((e, key) => {
  return { id: key.toString(), label: e }
})
