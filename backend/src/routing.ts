import { Express } from 'express'
import { signRouter } from './routes/sign.pipelines'
import { regionRouter } from './routes/region.pipelines'
import { wordRouter } from './routes/word.pipelines'

export function setupRoutes(app: Express): void {
  app.get('/', (_req, res) => res.json({ message: 'SignArchive API' }))

  app.use('/signs', signRouter)
  app.use('/regions', regionRouter)
  app.use('/words', wordRouter)
}
