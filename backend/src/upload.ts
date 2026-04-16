import multer from 'multer'
import path from 'path'
import { nanoid } from 'nanoid'
import fs from 'fs'
import { UPLOADS_DIR } from './config'

fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${nanoid()}${ext}`)
  }
})

export const upload = multer({ storage })
