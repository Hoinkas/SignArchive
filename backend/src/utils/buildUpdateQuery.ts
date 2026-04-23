import { getDb } from '../db/client'

export function buildUpdateQuery(table: string, id: string, data: Record<string, unknown>): void {
  const SKIP = new Set(['id', 'createdAt'])

  const fields = Object.entries(data)
    .filter(([k, v]) => !SKIP.has(k) && v !== undefined)
    .map(([k]) => `${k} = @${k}`)
    .join(', ')

  if (!fields) return

  getDb()
    .prepare(`UPDATE ${table} SET ${fields} WHERE id = @id`)
    .run({ id, ...data })
}
