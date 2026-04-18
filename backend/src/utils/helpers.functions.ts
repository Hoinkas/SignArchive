import { Request } from 'express'

export const param = (req: Request, key: string): string => req.params[key] as string

export function fillMissingValues<T>(obj: Partial<T>, template: Record<keyof T, null>): T {
  const result = { ...obj } as T
  for (const key in template) {
    if ((result as any)[key] === undefined) {
      ;(result as any)[key] = null
    }
  }
  return result
}
