import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { VIDEOS_DIR, THUMBNAILS_DIR } from '../config'

fs.mkdirSync(VIDEOS_DIR, { recursive: true })
fs.mkdirSync(THUMBNAILS_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.fieldname === 'videoFile') {
      cb(null, VIDEOS_DIR)
    } else if (file.fieldname === 'thumbnailFile') {
      cb(null, THUMBNAILS_DIR)
    }
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  }
})

export const upload = multer({ storage })
