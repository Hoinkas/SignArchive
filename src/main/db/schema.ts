import type Database from 'better-sqlite3'

export function initSchema(db: Database.Database): void {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS signs (
      id                  TEXT PRIMARY KEY,
      created_at          TEXT NOT NULL,
      notes               TEXT,
      status              TEXT NOT NULL DEFAULT 'draft',
      hand_shape          TEXT,
      location            TEXT,
      movement            TEXT,
      type                TEXT,
      phonology_extended  TEXT
    );

    CREATE TABLE IF NOT EXISTS signs_relations (
      created_at          TEXT NOT NULL,
      tail_sign_id        TEXT NOT NULL REFERENCES signs(id) ON DELETE CASCADE,
      head_sign_id        TEXT NOT NULL REFERENCES signs(id) ON DELETE CASCADE,
      relation_type       TEXT NOT NULL,
      PRIMARY KEY (tail_sign_id, head_sign_id)
    );

    CREATE TABLE IF NOT EXISTS words (
      id                  TEXT PRIMARY KEY,
      created_at          TEXT NOT NULL,
      text                TEXT NOT NULL,
      definition          TEXT,
      parent_word_id      TEXT REFERENCES words(id) ON DELETE SET NULL,
      aliases             TEXT,
      tags                TEXT
    );

    CREATE TABLE IF NOT EXISTS signers (
      id                  TEXT PRIMARY KEY,
      created_at          TEXT NOT NULL,
      name                TEXT NOT NULL,
      surname             TEXT NOT NULL,
      deafness_type       TEXT
    );

    CREATE TABLE IF NOT EXISTS sources (
      id                  TEXT PRIMARY KEY,
      created_at          TEXT NOT NULL,
      name                TEXT NOT NULL,
      online_url          TEXT,
      region              TEXT
    );

    CREATE TABLE IF NOT EXISTS media_files (
      id                  TEXT PRIMARY KEY,
      created_at          TEXT NOT NULL,
      sign_id             TEXT NOT NULL REFERENCES signs(id) ON DELETE CASCADE,
      file_type           TEXT NOT NULL,
      file_path           TEXT NOT NULL,
      online_url          TEXT,
      signer_id           TEXT REFERENCES signers(id) ON DELETE SET NULL,
      source_id           TEXT REFERENCES sources(id) ON DELETE SET NULL,
      is_primary          INTEGER NOT NULL DEFAULT 0,
      year                INTEGER
    );

    CREATE TABLE IF NOT EXISTS meanings (
      id                  TEXT PRIMARY KEY,
      created_at          TEXT NOT NULL,
      sign_id             TEXT NOT NULL REFERENCES signs(id) ON DELETE CASCADE,
      word_id             TEXT NOT NULL REFERENCES words(id) ON DELETE CASCADE,
      context             TEXT,
      region              TEXT,
      year_start          INTEGER,
      year_end            INTEGER,
      source_reliability  INTEGER NOT NULL DEFAULT 2,
      usage_frequency     INTEGER NOT NULL DEFAULT 2,
      notes               TEXT
    );
  `)
}
