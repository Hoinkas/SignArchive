import { ValidationError } from './errorHandler'

function validateId(id: string): void {
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    throw new ValidationError('Invalid ID format')
  }
}

export default validateId
