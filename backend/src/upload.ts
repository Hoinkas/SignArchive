import multer from 'multer'
import path from 'path'
import { nanoid } from 'nanoid'

const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads')

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
