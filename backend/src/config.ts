import path from 'path'

export const UPLOADS_DIR = process.env.UPLOADS_DIR ?? path.resolve(process.cwd(), 'data/uploads')
export const VIDEOS_DIR = path.join(UPLOADS_DIR, 'movies')
export const THUMBNAILS_DIR = path.join(UPLOADS_DIR, 'thumbnails')

export const UPLOADS_URL = '/data/uploads'
export const VIDEOS_URL = `${UPLOADS_URL}/movies`
export const THUMBNAILS_URL = `${UPLOADS_URL}/thumbnails`
