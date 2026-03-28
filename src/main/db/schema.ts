import type Database from 'better-sqlite3'

export function initSchema(db: Database.Database): void {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS word (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      text                TEXT NOT NULL,
      definition          TEXT,
      tags                TEXT
    );

    CREATE TABLE IF NOT EXISTS meaning (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      wordId              TEXT REFERENCES word(id) ON DELETE CASCADE,
      context             TEXT,
      notes               TEXT
    );

    CREATE TABLE IF NOT EXISTS sign (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      notes               TEXT
    );

    CREATE TABLE IF NOT EXISTS meaningSign (
      meaningId           TEXT NOT NULL REFERENCES meaning(id) ON DELETE CASCADE,
      signId              TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
      PRIMARY KEY (meaningId, signId)
    );

    CREATE TABLE IF NOT EXISTS signer (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      name                TEXT NOT NULL,
      surname             TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS author (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      name                TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS mediaFile (
      id                  TEXT PRIMARY KEY,
      createDate          TEXT NOT NULL,
      fileType            TEXT NOT NULL,
      filePath            TEXT NOT NULL,
      onlineUrl           TEXT
    );

    CREATE TABLE IF NOT EXISTS source (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      signerId            TEXT REFERENCES signer(id) ON DELETE SET NULL,
      authorId            TEXT REFERENCES author(id) ON DELETE SET NULL,
      mediaFileId         TEXT REFERENCES mediaFile(id) ON DELETE SET NULL,
      region              TEXT,
      yearStart           INTEGER,
      yearEnd             INTEGER,
      notes               TEXT
    );

    CREATE TABLE IF NOT EXISTS sourceSign (
      sourceId            TEXT NOT NULL REFERENCES source(id) ON DELETE CASCADE,
      signId              TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
      isMainSource        INTEGER CHECK (isMainSource IN (0, 1)),
      PRIMARY KEY (sourceId, signId)
    );
  `)
}
