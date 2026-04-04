import type Database from 'better-sqlite3'

export function initSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS word (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      text                TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sign (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      file                TEXT NOT NULL,
      notes               TEXT
    );

    CREATE TABLE IF NOT EXISTS author (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      name                TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS mediaFile (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      fileUrl             TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS source (
      id                  TEXT PRIMARY KEY,
      createdAt           TEXT NOT NULL,
      authorId            TEXT REFERENCES author(id) ON DELETE SET NULL,
      mediaFileId         TEXT REFERENCES mediaFile(id) ON DELETE SET NULL,
      region              TEXT,
      yearStart           INTEGER,
      yearEnd             INTEGER,
      notes               TEXT
    );

    CREATE TABLE IF NOT EXISTS definition (
      id          TEXT PRIMARY KEY,
      createdAt   TEXT NOT NULL,
      category    TEXT NOT NULL,
      text        TEXT NOT NULL,
      translation TEXT
    );

    CREATE TABLE IF NOT EXISTS tag (
      id          TEXT NOT NULL,
      createdAt   TEXT NOT NULL,
      name        TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sourceSignWord (
      sourceId            TEXT NOT NULL REFERENCES source(id) ON DELETE CASCADE,
      wordId              TEXT NOT NULL REFERENCES word(id) ON DELETE CASCADE,
      signId              TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
      PRIMARY KEY (sourceId, wordId, signId)
    );

    CREATE TABLE IF NOT EXISTS definitionSignWord (
      definitionId        TEXT NOT NULL REFERENCES definition(id) ON DELETE CASCADE,
      signId              TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
      wordId              TEXT NOT NULL REFERENCES word(id) ON DELETE CASCADE,
      PRIMARY KEY (definitionId, signId, wordId)
    );

    CREATE TABLE IF NOT EXISTS tagWord (
      tagId               TEXT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
      wordId              TEXT NOT NULL REFERENCES word(id) ON DELETE CASCADE,
      PRIMARY KEY (tagId, wordId)
    );

    CREATE INDEX IF NOT EXISTS idx_sourceSignWord_signId ON sourceSignWord(signId);
    CREATE INDEX IF NOT EXISTS idx_sourceSignWord_sourceId ON sourceSignWord(sourceId);
    CREATE INDEX IF NOT EXISTS idx_sourceSignWord_wordId ON sourceSignWord(wordId);

    CREATE INDEX IF NOT EXISTS idx_source_mediaFileId ON source(mediaFileId);
    CREATE INDEX IF NOT EXISTS idx_source_authorId ON source(authorId);

    CREATE INDEX IF NOT EXISTS idx_definitionSignWord_definitionId ON definitionSignWord(definitionId);
    CREATE INDEX IF NOT EXISTS idx_definitionSignWord_signId ON definitionSignWord(signId);
    CREATE INDEX IF NOT EXISTS idx_definitionSignWord_wordId ON definitionSignWord(wordId);

    CREATE INDEX IF NOT EXISTS idx_tagWord_wordId ON tagWord(wordId);
    CREATE INDEX IF NOT EXISTS idx_tagWord_tagId ON tagWord(tagId);
  `)
}
