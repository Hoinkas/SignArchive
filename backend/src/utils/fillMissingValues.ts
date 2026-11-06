export function fillMissingValues<T>(obj: Partial<T>, template: Record<keyof T, null>): T {
  const result = { ...obj } as T

  for (const key in template) {
    if ((obj as any)[key] === undefined) {
      ;(obj as any)[key] = null
    }
  }
  return result
}