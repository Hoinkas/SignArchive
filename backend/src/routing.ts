import { Express } from 'express'
import authRouter from './routes/auth.pipelines'
import { signRouter } from './routes/sign.pipelines'
import { mediaRouter } from './routes/media.pipelines'

export function setupRoutes(app: Express): void {
  app.get('/', (_req, res) => res.json({ message: 'SignArchive API' }))

  app.use('/auth', authRouter)
  app.use('/signs', signRouter)
  app.use('/media', mediaRouter)
}
