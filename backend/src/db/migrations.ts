import { Database } from 'better-sqlite3'

export function runMigrations(db: Database): void {
  // const columns = db.prepare(`PRAGMA table_info(evidence)`).all() as { name: string }[]
  // const columnNames = columns.map((c) => c.name)
  // if (!columnNames.includes('type')) {
  //   db.prepare(`ALTER TABLE evidence ADD COLUMN type TEXT NOT NULL DEFAULT 'unknown'`).run()
  //   db.prepare(`UPDATE evidence SET type = 'książka' WHERE type = 'unknown'`).run()
  //   console.log('Migration: added column type to evidence')
  // }
}
