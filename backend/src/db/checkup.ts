import { Database } from 'better-sqlite3'
import fs from 'fs'
import { nanoid } from 'nanoid'
import path from 'path'
import { VIDEOS_DIR, THUMBNAILS_DIR, THUMBNAILS_URL } from '../config'
import { generateThumbnail } from '../utils/helpers.functions'
import { ISignAttached } from '../models/sign.model'
import { IMediaAttached } from '../models/media.model'
import { IWordAttached } from '../models/word.model'
import { IMeaningAttached } from '../models/meaning.model'
import { IRegionAttached } from '../models/region.model'
import { IReferenceAttached } from '../models/reference.model'
import { ISourceAttached } from '../models/source.model'
import { hashPassword } from '../utils/authorisation'

export async function runCheckup(db: Database): Promise<void> {
  // const columns = db.prepare(`PRAGMA table_info(evidence)`).all() as { name: string }[]
  // const columnNames = columns.map((c) => c.name)
  // if (!columnNames.includes('type')) {
  //   db.prepare(`ALTER TABLE evidence ADD COLUMN type TEXT NOT NULL DEFAULT 'unknown'`).run()
  //   db.prepare(`UPDATE evidence SET type = 'książka' WHERE type = 'unknown'`).run()
  //   console.log('Migration: added column type to evidence')
  // }

  void (await checkMissingThumbnails(db))
  void (await updateDatabaseToNewSchema(db))
}

async function checkMissingThumbnails(db: Database): Promise<void> {
  if (!fs.existsSync(VIDEOS_DIR)) return
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true })

  const movieFiles = fs.readdirSync(VIDEOS_DIR)
  const existingThumbnails = new Set(
    fs.readdirSync(THUMBNAILS_DIR).map((file) => path.parse(file).name)
  )

  const missing = movieFiles.filter((movie) => !existingThumbnails.has(path.parse(movie).name))

  for (const movie of missing) {
    const thumbnailFilename = `${path.parse(movie).name}.jpg`

    try {
      await generateThumbnail(movie)

      const thumbnailUrl = `${THUMBNAILS_URL}/${thumbnailFilename}`
      db.prepare(
        `UPDATE media SET thumbnailUrl = @thumbnailUrl WHERE videoUrl LIKE @videoUrlPattern`
      ).run({
        thumbnailUrl,
        videoUrlPattern: `%/${movie}`
      })

      console.log(`Checkup: generated thumbnail for "${movie}" and updated DB`)
    } catch (err) {
      console.error(`Checkup: failed to generate thumbnail for "${movie}"`, err)
    }
  }
}

async function updateDatabaseToNewSchema(db: Database): Promise<void> {
  if ((db.pragma('user_version', { simple: true }) as number) >= 2) return

  // await db.backup(`backup-before-v2-${Date.now()}.db`)
  const passwordHash = await hashPassword(process.env.ADMIN_PASSWORD || 'admin')

  db.pragma('foreign_keys = OFF')

  const migrate = db.transaction(() => {
    // USER
    db.exec(`
      DROP TABLE user;

      CREATE TABLE user (
        id            TEXT PRIMARY KEY NOT NULL,
        email         TEXT NOT NULL UNIQUE,
        login         TEXT NOT NULL UNIQUE,
        password      TEXT NOT NULL,
        isActivated   INTEGER,
        nickname      TEXT,
        contact       TEXT,
        description   TEXT
      );
    `)
    db.prepare(
      `INSERT OR IGNORE INTO user
         (id, email, login, password, isActivated, nickname, contact, description)
       VALUES (?, ?, ?, ?, 1, ?, ?, ?)`
    ).run(
      nanoid(),
      'archiwumig@proton.me',
      'admin',
      passwordHash,
      'ArchiwuMig',
      'archiwumig@proton.me',
      'Archiwum dawnych i regionalnych znaków PJM. Dokumentujemy znaki, które znikają. Odkrywamy pochodzenie i znaczenie znaków.'
    )
    const { id: userId } = db.prepare(`SELECT id FROM user WHERE login = ?`).get('admin') as {
      id: string
    }

    //SIGN
    const signs = db.prepare(`SELECT * FROM sign`).all() as ISignAttached[]

    db.exec(`
      CREATE TABLE sign_temp (
        id           TEXT PRIMARY KEY NOT NULL,
        uniqueNumber INTEGER NOT NULL UNIQUE,
        notes        TEXT
      );`)

    let signNumber = 0

    for (const s of signs) {
      console.log(s)
      signNumber += 1

      db.prepare(
        `INSERT INTO sign_temp (id, uniqueNumber, notes)
        VALUES (?, ?, ?)`
      ).run(s.id, signNumber, s.notes)

      if (s.notes) {
        db.prepare(
          `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
          VALUES (?, 'sign', 'notes', ?, NULL, ?, ?, ?)`
        ).run(nanoid(), s.id, s.notes, userId, s.createdAt)
      }
    }

    db.exec(`
      DROP TABLE sign;
      ALTER TABLE sign_temp RENAME TO sign;`)

    // MEDIA
    const signByMedia = new Map<string, string>()
    for (const s of signs) signByMedia.set(s.mediaId, s.id)

    db.exec(`
      CREATE TABLE media_temp (
        id           TEXT PRIMARY KEY NOT NULL,
        videoUrl     TEXT NOT NULL,
        signId       TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE,
        thumbnailUrl TEXT NOT NULL,
        description  TEXT
      );`)

    const mediaList = db.prepare(`SELECT * FROM media`).all() as IMediaAttached[]
    for (const m of mediaList) {
      const signId = signByMedia.get(m.id)
      if (!signId) continue

      db.prepare(
        `INSERT INTO media_temp (id, videoUrl, signId, thumbnailUrl, description)
        VALUES (?, ?, ?, ?, ?)`
      ).run(m.id, m.videoUrl, signId, m.thumbnailUrl, m.description ?? null)

      console.log(m)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'media', 'videoUrl', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), m.id, m.videoUrl, userId, m.createdAt)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'media', 'signId', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), m.id, signId, userId, m.createdAt)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'media', 'thumbnailUrl', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), m.id, m.thumbnailUrl, userId, m.createdAt)

      if (m.description) {
        db.prepare(
          `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
          VALUES (?, 'media', 'description', ?, NULL, ?, ?, ?)`
        ).run(nanoid(), m.id, m.description, userId, m.createdAt)
      }
    }

    db.exec(`
      DROP TABLE media;
      ALTER TABLE media_temp RENAME TO media;
    `)

    //WORDS
    const words = db.prepare(`SELECT * FROM word`).all() as IWordAttached[]

    words.forEach((w) => {
      console.log(w)
      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'word', 'name', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), w.id, w.name, userId, w.createdAt)
    })

    db.exec(`
      CREATE TABLE IF NOT EXISTS word_temp (
        id        TEXT PRIMARY KEY NOT NULL,
        name      TEXT NOT NULL UNIQUE
      );
      INSERT INTO word_temp (id, name)
        SELECT id, name FROM word;
      DROP TABLE word;
      ALTER TABLE word_temp RENAME TO word;`)

    //MEANING
    const meanings = db.prepare(`SELECT * FROM meaning`).all() as IMeaningAttached[]

    meanings.forEach((m) => {
      console.log(m)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'meaning', 'explanation', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), m.id, m.explanation, userId, m.createdAt)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'meaning', 'signId', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), m.id, m.signId, userId, m.createdAt)
    })

    db.exec(`
      CREATE TABLE IF NOT EXISTS meaning_temp (
        id            TEXT PRIMARY KEY NOT NULL,
        explanation   TEXT NOT NULL,
        signId        TEXT NOT NULL REFERENCES sign(id) ON DELETE CASCADE
      );
      INSERT INTO meaning_temp (id, explanation, signId)
        SELECT id, explanation, signId FROM meaning;
      DROP TABLE meaning;
      ALTER TABLE meaning_temp RENAME TO meaning;`)

    //REGION
    const regions = db.prepare(`SELECT * FROM region`).all() as IRegionAttached[]

    regions.forEach((r) => {
      console.log(r)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'region', 'name', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), r.id, r.name, userId, r.createdAt)
    })

    db.exec(`
      CREATE TABLE IF NOT EXISTS region_temp (
        id        TEXT PRIMARY KEY NOT NULL,
        name      TEXT NOT NULL
      );
      INSERT INTO region_temp (id, name)
        SELECT id, name FROM region;
      DROP TABLE region;
      ALTER TABLE region_temp RENAME TO region;`)

    //REFERENCE
    const references = db.prepare(`SELECT * FROM reference`).all() as IReferenceAttached[]

    for (const r of references) {
      console.log(r)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'reference', 'name', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), r.id, r.name, userId, r.createdAt)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'reference', 'fullName', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), r.id, r.fullName, userId, r.createdAt)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'reference', 'type', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), r.id, r.type, userId, r.createdAt)

      if (r.url) {
        db.prepare(
          `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
          VALUES (?, 'reference', 'url', ?, NULL, ?, ?, ?)`
        ).run(nanoid(), r.id, r.url, userId, r.createdAt)
      }

      if (r.notes) {
        db.prepare(
          `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
          VALUES (?, 'reference', 'notes', ?, NULL, ?, ?, ?)`
        ).run(nanoid(), r.id, r.notes, userId, r.createdAt)
      }
    }

    db.exec(`
      CREATE TABLE IF NOT EXISTS reference_temp (
        id            TEXT PRIMARY KEY NOT NULL,
        name          TEXT NOT NULL,
        fullName      TEXT NOT NULL,
        type          TEXT NOT NULL,
        url           TEXT,
        notes         TEXT
      );
      INSERT INTO reference_temp (id, name, fullName, type, url, notes)
        SELECT id, name, fullName, type, url, notes FROM reference;
      DROP TABLE reference;
      ALTER TABLE reference_temp RENAME TO reference;`)

    // SOURCE
    const sources = db.prepare(`SELECT * FROM source`).all() as ISourceAttached[]

    for (const s of sources) {
      console.log(s)

      db.prepare(
        `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
        VALUES (?, 'source', 'yearStart', ?, NULL, ?, ?, ?)`
      ).run(nanoid(), s.id, s.yearStart, userId, s.createdAt)

      if (s.yearEnd) {
        db.prepare(
          `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
          VALUES (?, 'source', 'yearEnd', ?, NULL, ?, ?, ?)`
        ).run(nanoid(), s.id, s.yearEnd, userId, s.createdAt)
      }

      if (s.context) {
        db.prepare(
          `INSERT INTO changelog (id, tableName, fieldName, recordId, oldValue, newValue, addBy, addDate)
          VALUES (?, 'source', 'note', ?, NULL, ?, ?, ?)`
        ).run(nanoid(), s.id, s.context, userId, s.createdAt)
      }
    }

    db.exec(`
      CREATE TABLE IF NOT EXISTS source_temp (
        id            TEXT PRIMARY KEY NOT NULL,
        referenceId   TEXT NOT NULL REFERENCES reference(id) ON DELETE CASCADE,
        yearStart     INTEGER,
        yearEnd       INTEGER,
        note          TEXT
      );
      INSERT INTO source_temp (id, referenceId, yearStart, yearEnd, note)
        SELECT id, referenceId, yearStart, yearEnd, context FROM source;
      DROP TABLE source;
      ALTER TABLE source_temp RENAME TO source;`)

    // INDEXES
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_media_signId              ON media(signId);
      CREATE INDEX IF NOT EXISTS idx_meaning_signId            ON meaning(signId);
      CREATE INDEX IF NOT EXISTS idx_source_referenceId        ON source(referenceId);
      CREATE INDEX IF NOT EXISTS idx_regionSource_sourceId     ON regionSource(sourceId);
      CREATE INDEX IF NOT EXISTS idx_regionSource_regionId     ON regionSource(regionId);
      CREATE INDEX IF NOT EXISTS idx_meaningSource_meaningId   ON meaningSource(meaningId);
      CREATE INDEX IF NOT EXISTS idx_meaningSource_sourceId    ON meaningSource(sourceId);
      CREATE INDEX IF NOT EXISTS idx_wordMeaning_meaningId     ON wordMeaning(meaningId);
      CREATE INDEX IF NOT EXISTS idx_wordMeaning_wordId        ON wordMeaning(wordId);
    `)

    const broken = db.pragma('foreign_key_check') as unknown[]
    if (broken.length) throw new Error(`Naruszone FK: ${JSON.stringify(broken)}`)

    db.pragma('user_version = 2')
  })

  try {
    migrate.immediate()
    console.log('DB updated to v2')
  } catch (err) {
    console.error('Failed to update DB', err)
    throw err
  } finally {
    db.pragma('foreign_keys = ON')
  }
}
