import { Express } from 'express'
import authRouter from './routes/auth.pipelines'
import { signRouter } from './routes/sign.pipelines'

export function setupRoutes(app: Express): void {
  app.get('/', (_req, res) => res.json({ message: 'SignArchive API' }))

  app.use('/auth', authRouter)

  app.use('/signs', signRouter)

  // app.use('/signs', sourceListRouter)
  // app.use('/sources', sourceRouter)
  // app.use('/words', wordRouter)
  // app.use('/words', signRouter)
  // app.use('/media', mediaRouter)
}
