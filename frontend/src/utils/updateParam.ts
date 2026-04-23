import type { SetURLSearchParams } from 'react-router-dom'

export default function updateParam(
  key: string,
  value: string | null,
  setParams: SetURLSearchParams
): void {
  setParams((prev) => {
    const next = new URLSearchParams(prev)
    if (value === null || value === '') next.delete(key)
    else next.set(key, value)
    return next
  })
}
