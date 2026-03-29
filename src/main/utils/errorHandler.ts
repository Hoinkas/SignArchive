export class DatabaseError extends Error {
  constructor(operation: string, originalError: unknown) {
    super(
      `Database error during ${operation}: ${originalError instanceof Error ? originalError.message : String(originalError)}`
    )
    this.name = 'DatabaseError'
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export const handlerWithErrorLogging = <T>(fn: () => T): T => {
  try {
    return fn()
  } catch (error) {
    console.error('Error in handler:', error)
    throw error
  }
}
