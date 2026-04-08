import { Express } from 'express'
import { wordRouter } from './routes/word.pipelines'
import { signRouter } from './routes/sign.pipelines'
import { tagRouter, tagWordRouter } from './routes/tag.pipelines'
import { sourceListRouter, sourceRouter } from './routes/source.pipelines'
import { definitionRouter } from './routes/definition.pipelines'
import { authorRouter } from './routes/author.pipelines'

export function setupRoutes(app: Express): void {
  app.get('/', (_req, res) => res.json({ message: 'SignArchive API' }))

  app.use('/words', wordRouter)
  app.use('/words', signRouter)
  app.use('/words', tagWordRouter)

  app.use('/signs', signRouter)
  app.use('/signs', sourceListRouter)

  app.use('/definitions', definitionRouter)
  app.use('/sources', sourceRouter)
  app.use('/tags', tagRouter)
  app.use('/authors', authorRouter)
}
