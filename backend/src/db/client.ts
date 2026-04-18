import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { runMigrations } from './migrations'

const DB_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'signarchive.db')

fs.mkdirSync(DB_DIR, { recursive: true })

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    initSchema(db)
    runMigrations(db)
  }
  return db
}

function initSchema(db: Database.Database): void {
  db.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS media (
      id            TEXT PRIMARY KEY,
      createdAt     INTEGER NOT NULL,
      videoUrl      TEXT NOT NULL,
      thumbnailUrl  TEXT NOT NULL,
      mediaType     TEXT NOT NULL,
      description   TEXT
    );

    CREATE TABLE IF NOT EXISTS sign (
      id            TEXT PRIMARY KEY,
      createdAt     INTEGER NOT NULL,
      mediaId       TEXT REFERENCES media(id) ON DELETE CASCADE,
      notes         TEXT
    );

    CREATE TABLE IF NOT EXISTS word (
      id        TEXT PRIMARY KEY,
      createdAt INTEGER NOT NULL,
      name      TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS meaning (
      id            TEXT PRIMARY KEY,
      createdAt     INTEGER NOT NULL,
      explaination  TEXT NOT NULL,
      signId        TEXT REFERENCES sign(id) ON DELETE SET NULL,
    );

    CREATE TABLE IF NOT EXISTS region (
      id        TEXT PRIMARY KEY,
      createdAt INTEGER NOT NULL,
      name      TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reference (
      id            TEXT PRIMARY KEY,
      createdAt     INTEGER NOT NULL,
      url           TEXT NOT NULL,
      name          TEXT NOT NULL,
      fullName      TEXT NOT NULL,
      type          TEXT NOT NULL,
      notes         TEXT
    );

    CREATE TABLE IF NOT EXISTS source (
      id            TEXT PRIMARY KEY,
      createdAt     INTEGER NOT NULL,
      referenceId   TEXT REFERENCES reference(id) ON DELETE SET NULL,
      yearStart     INTEGER,
      yearEnd       INTEGER,
      context       TEXT
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

    CREATE INDEX IF NOT EXISTS idx_sign_mediaId              ON sign(mediaId);
    CREATE INDEX IF NOT EXISTS idx_meaning_signId            ON meaning(signId);
    CREATE INDEX IF NOT EXISTS idx_source_referenceId        ON source(referenceId);
    CREATE INDEX IF NOT EXISTS idx_regionSource_sourceId     ON regionSource(sourceId);
    CREATE INDEX IF NOT EXISTS idx_regionSource_reigionId    ON regionSource(regionId);
    CREATE INDEX IF NOT EXISTS idx_meaningSource_meaningId   ON meaningSource(meaningId);
    CREATE INDEX IF NOT EXISTS idx_meaningSource_sourceId    ON meaningSource(sourceId);
    CREATE INDEX IF NOT EXISTS idx_wordMeaning_meaningId     ON wordMeaning(meaningId);
    CREATE INDEX IF NOT EXISTS idx_wordMeaning_wordId        ON wordMeaning(wordId);
  `)
}
