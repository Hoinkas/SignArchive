import { Database } from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { VIDEOS_DIR, THUMBNAILS_DIR, THUMBNAILS_URL } from '../config'
import { generateThumbnail } from '../utils/helpers.functions'

export async function runCheckup(db: Database): Promise<void> {
  void (await checkMissingThumbnails(db))
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
