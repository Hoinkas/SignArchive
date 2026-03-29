function toSqlParams(obj: object): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[key]
    result[key] = value === undefined ? null : value
  }
  return result
}

export default toSqlParams
