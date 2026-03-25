import Database from 'better-sqlite3'
import path from 'node:path'
import { initSchema } from './schema'
import fs from 'node:fs'

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (db) return db

  const dbDir = path.join(process.cwd(), 'src/main/db')
  const dbPath = path.join(dbDir, 'signs.db')

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }

  console.log('[DB] Ścieżka bazy:', dbPath)

  db = new Database(dbPath)
  initSchema(db)
  console.log('[DB] Baza danych gotowa')

  return db
}
