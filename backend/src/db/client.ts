import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { runCheckup } from './checkup'

const DB_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'signarchive.db')

fs.mkdirSync(DB_DIR, { recursive: true })

let db: Database.Database | null = null

export function getDb(): Database.Database {
  try {
    if (!db) {
      db = new Database(DB_PATH)
      initSchema(db)
      runCheckup(db)
    }
    return db
  } catch (e) {
    console.error('DB OPEN FAILED:', e)
    throw e
  }
}

function initSchema(db: Database.Database): void {
  db.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS user (
      id            TEXT PRIMARY KEY NOT NULL,
      email         TEXT NOT NULL UNIQUE,
      login         TEXT NOT NULL UNIQUE,
      password      TEXT NOT NULL,
      isActivated   INTEGER NOT NULL,
      nickname      TEXT,
      contact       TEXT,
      description   TEXT
    );

    CREATE TABLE IF NOT EXISTS changelog (
      id            TEXT PRIMARY KEY NOT NULL,
      tableName     TEXT NOT NULL,
      fieldName     TEXT NOT NULL,
      recordId      TEXT NOT NULL,
      oldValue      TEXT,
      newValue      TEXT NOT NULL,
      addBy         TEXT NOT NULL REFERENCES user(id),
      addDate       INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS media (
      id            TEXT PRIMARY KEY NOT NULL,
      videoUrl      TEXT NOT NULL,
      signId        TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
      thumbnailUrl  TEXT NOT NULL,
      description   TEXT
    );

    CREATE TABLE IF NOT EXISTS sign (
      id            TEXT PRIMARY KEY NOT NULL,
      uniqueNumber  INTEGER NOT NULL UNIQUE,
      notes         TEXT
    );

    CREATE TABLE IF NOT EXISTS word (
      id        TEXT PRIMARY KEY NOT NULL,
      name      TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS meaning (
      id            TEXT PRIMARY KEY NOT NULL,
      explanation   TEXT NOT NULL,
      signId        TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS region (
      id        TEXT PRIMARY KEY NOT NULL,
      name      TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reference (
      id            TEXT PRIMARY KEY NOT NULL,
      name          TEXT NOT NULL,
      fullName      TEXT NOT NULL,
      type          TEXT NOT NULL,
      url           TEXT,
      notes         TEXT
    );

    CREATE TABLE IF NOT EXISTS source (
      id            TEXT PRIMARY KEY NOT NULL,
      referenceId   TEXT NOT NULL REFERENCES reference(id) ON DELETE CASCADE,
      yearStart     INTEGER,
      yearEnd       INTEGER,
      notes         TEXT
    );

    CREATE TABLE IF NOT EXISTS regionSource (
      sourceId      TEXT NOT NULL REFERENCES source(id) ON DELETE CASCADE,
      regionId      TEXT NOT NULL REFERENCES region(id) ON DELETE CASCADE,
      PRIMARY KEY (sourceId, regionId)
    );

    CREATE TABLE IF NOT EXISTS meaningSource (
      meaningId     TEXT NOT NULL REFERENCES meaning(id) ON DELETE CASCADE,
      sourceId      TEXT NOT NULL REFERENCES source(id) ON DELETE CASCADE,
      PRIMARY KEY (meaningId, sourceId)
    );

    CREATE TABLE IF NOT EXISTS wordMeaning (
      meaningId     TEXT NOT NULL REFERENCES meaning(id) ON DELETE CASCADE,
      wordId        TEXT NOT NULL REFERENCES word(id) ON DELETE CASCADE,
      PRIMARY KEY (meaningId, wordId)
    );
  `)

  // CREATE INDEX IF NOT EXISTS idx_media_signId              ON media(signId);
  // CREATE INDEX IF NOT EXISTS idx_meaning_signId            ON meaning(signId);
  // CREATE INDEX IF NOT EXISTS idx_source_referenceId        ON source(referenceId);
  // CREATE INDEX IF NOT EXISTS idx_regionSource_sourceId     ON regionSource(sourceId);
  // CREATE INDEX IF NOT EXISTS idx_regionSource_regionId     ON regionSource(regionId);
  // CREATE INDEX IF NOT EXISTS idx_meaningSource_meaningId   ON meaningSource(meaningId);
  // CREATE INDEX IF NOT EXISTS idx_meaningSource_sourceId    ON meaningSource(sourceId);
  // CREATE INDEX IF NOT EXISTS idx_wordMeaning_meaningId     ON wordMeaning(meaningId);
  // CREATE INDEX IF NOT EXISTS idx_wordMeaning_wordId        ON wordMeaning(wordId);
}
