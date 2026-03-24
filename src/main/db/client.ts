import Database from 'better-sqlite3'
// import { app } from 'electron'
import path from 'node:path'
import { initSchema } from './schema'
import fs from 'node:fs'
import { seedDatabase } from './seed'

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
  seedDatabase(db)
  console.log('[DB] Baza danych gotowa')

  return db
}
