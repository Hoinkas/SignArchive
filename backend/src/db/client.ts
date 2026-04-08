import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'signarchive.db')

fs.mkdirSync(DB_DIR, { recursive: true })

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    initSchema(db)
  }
  return db
}

function initSchema(db: Database.Database): void {
  db.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS word (
      id        TEXT PRIMARY KEY,
      createdAt INTEGER NOT NULL,
      text      TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sign (
      id            TEXT PRIMARY KEY,
      createdAt     INTEGER NOT NULL,
      fileUrl       TEXT NOT NULL,
      fileMediaType TEXT NOT NULL,
      fileName      TEXT,
      notes         TEXT
    );

    CREATE TABLE IF NOT EXISTS author (
      id        TEXT PRIMARY KEY,
      createdAt INTEGER NOT NULL,
      name      TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS evidence (
      id        TEXT PRIMARY KEY,
      createdAt INTEGER NOT NULL,
      fileUrl   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS source (
      id          TEXT PRIMARY KEY,
      createdAt   INTEGER NOT NULL,
      authorId    TEXT REFERENCES author(id) ON DELETE SET NULL,
      evidenceId TEXT REFERENCES evidence(id) ON DELETE SET NULL,
      region      TEXT,
      yearStart   INTEGER,
      yearEnd     INTEGER,
      notes       TEXT
    );

    CREATE TABLE IF NOT EXISTS definition (
      id          TEXT PRIMARY KEY,
      createdAt   INTEGER NOT NULL,
      category    TEXT NOT NULL,
      text        TEXT NOT NULL,
      translation TEXT
    );

    CREATE TABLE IF NOT EXISTS tag (
      id        TEXT PRIMARY KEY,
      createdAt INTEGER NOT NULL,
      name      TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS sourceSignWord (
      sourceId TEXT NOT NULL REFERENCES source(id) ON DELETE CASCADE,
      wordId   TEXT NOT NULL REFERENCES word(id) ON DELETE CASCADE,
      signId   TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
      PRIMARY KEY (sourceId, wordId, signId)
    );

    CREATE TABLE IF NOT EXISTS definitionSignWord (
      definitionId TEXT NOT NULL REFERENCES definition(id) ON DELETE CASCADE,
      signId       TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
      wordId       TEXT NOT NULL REFERENCES word(id) ON DELETE CASCADE,
      PRIMARY KEY (definitionId, signId, wordId)
    );

    CREATE TABLE IF NOT EXISTS tagWord (
      tagId  TEXT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
      wordId TEXT NOT NULL REFERENCES word(id) ON DELETE CASCADE,
      PRIMARY KEY (tagId, wordId)
    );

    CREATE INDEX IF NOT EXISTS idx_sourceSignWord_signId     ON sourceSignWord(signId);
    CREATE INDEX IF NOT EXISTS idx_sourceSignWord_wordId     ON sourceSignWord(wordId);
    CREATE INDEX IF NOT EXISTS idx_definitionSignWord_signId ON definitionSignWord(signId);
    CREATE INDEX IF NOT EXISTS idx_definitionSignWord_wordId ON definitionSignWord(wordId);
    CREATE INDEX IF NOT EXISTS idx_tagWord_wordId            ON tagWord(wordId);
  `)
}
