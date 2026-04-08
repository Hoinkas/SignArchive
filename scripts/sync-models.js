import { cpSync, watch } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const src = resolve(root, 'shared/models')
const targets = [resolve(root, 'backend/src/models/'), resolve(root, 'frontend/src/models/')]

function sync() {
  targets.forEach((target) => {
    cpSync(src, target, { recursive: true })
    console.log(`Synced → ${target}`)
  })
}

sync()

if (process.argv.includes('--watch')) {
  console.log('Watching shared/models...')
  watch(src, { recursive: true }, (event, filename) => {
    console.log(`Changed: ${filename}`)
    sync()
  })
}
