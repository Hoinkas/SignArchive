import { Express } from 'express'
import { signRouter } from './routes/sign.pipelines'

export function setupRoutes(app: Express): void {
  app.get('/', (_req, res) => res.json({ message: 'SignArchive API' }))

  app.use('/signs', signRouter)
}
