import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { setupRoutes } from './routing'
import { errorMiddleware, notFoundMiddleware } from './middlewares/middleware'
import { UPLOADS_DIR } from './config'

const app = express()

app.set('port', process.env.PORT ?? 3000)

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json({ limit: '50mb' }))

setupRoutes(app)

app.use('/uploads', express.static(UPLOADS_DIR))

app.use(notFoundMiddleware)
app.use(errorMiddleware)

app.listen(app.get('port'), () => {
  console.log(`SignArchive API listening on http://localhost:${app.get('port')}`)
})

export default app
