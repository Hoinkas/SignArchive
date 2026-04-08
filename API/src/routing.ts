import { Express } from 'express'
import { wordRouter } from './routing-pipelines/word.pipelines'
import { signRouter } from './routing-pipelines/sign.pipelines'
import { tagRouter, tagWordRouter } from './routing-pipelines/tag.pipelines'
import { sourceListRouter, sourceRouter } from './routing-pipelines/source.pipelines'
import { definitionRouter } from './routing-pipelines/definition.pipelines'

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
}