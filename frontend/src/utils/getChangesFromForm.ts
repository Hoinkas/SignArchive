import type { IBaseModelAttached } from '@src/models/base.interface'

type WithoutBase<T> = Omit<T, keyof IBaseModelAttached>

export function getChanges<T>(
  original: WithoutBase<T>,
  updated: Partial<WithoutBase<T>>
): Partial<WithoutBase<T>> {
  const changes: Partial<WithoutBase<T>> = {}

  for (const key of Object.keys(updated) as Array<keyof WithoutBase<T>>) {
    if (updated[key] !== original[key]) {
      changes[key] = updated[key]
    }
  }

  return changes
}
