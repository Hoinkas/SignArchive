import { Express } from 'express'
import authRouter from './routes/auth.pipelines'
import { signRouter } from './routes/sign.pipelines'
import { mediaRouter } from './routes/media.pipelines'
import { meaningRouter } from './routes/meaning.pipeplines'
import { wordRouter } from './routes/word.pipelines'

import { sourceRouter } from './routes/source.pipelines'
import { regionRouter } from './routes/region.pipelines'
import { referenceRouter } from './routes/reference.pipelines'

export function setupRoutes(app: Express): void {
  app.get('/', (_req, res) => res.json({ message: 'SignArchive API' }))

  app.use('/auth', authRouter)
  app.use('/signs', signRouter)
  app.use('/media', mediaRouter)
  app.use('/signs/:signId/meanings', meaningRouter)
  app.use('/meanings/:meaningId/words', wordRouter)
  app.use('/meanings/:meaningId/sources', sourceRouter)
  app.use('/regions', regionRouter)
  app.use('/sources/:sourceId/regions', regionRouter)
  app.use('/references', referenceRouter)
  app.use('/words', wordRouter)
}
