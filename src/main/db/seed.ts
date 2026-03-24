import type Database from 'better-sqlite3'
import { mapSignsFromExcelToDatabase } from '../generateDbFromExcel'
import { createSigner } from '../ipc/signers'
import { createSource } from '../ipc/sources'
import { createWord } from '../ipc/words'
import { createMediaFile } from '../ipc/media_files'
import { createSign } from '../ipc/signs'
import { createMeaning } from '../ipc/meanings'

export function seedDatabase(db: Database.Database): void {
  const existingCount = (
    db.prepare('SELECT COUNT(*) as count FROM signs').get() as { count: number }
  ).count

  if (existingCount > 0) {
    console.log('[DB] Seed: baza już zawiera dane, pomijam.')
    return
  }

  console.log('[DB] Seed: wypełniam bazę danymi z JSON...')

  const runSeed = db.transaction(() => {
    // Mapy deduplicacyjne
    const wordIdMap: Map<string, string> = new Map()
    const signerIdMap: Map<string, string> = new Map()
    const sourceIdMap: Map<string, string> = new Map()

    const records = mapSignsFromExcelToDatabase()

    for (const record of records) {
      const { sign, word, mediaFile, source, signer, meaning } = record

      // SOURCE
      let sourceId = sourceIdMap.get(source.name)
      if (!sourceId) {
        sourceId = createSource(source).id
        sourceIdMap.set(source.name, sourceId)
      }

      // SIGNER
      let signerId: string | undefined
      const signerKey = `${signer.name} ${signer.surname}`.trim()
      if (signerKey) {
        signerId = signerIdMap.get(signerKey)
        if (!signerId) {
          signerId = createSigner(signer).id
          signerIdMap.set(signerKey, signerId)
        }
      }

      // SIGN
      const createdSign = createSign(sign)

      // MEDIA FILE
      createMediaFile({
        ...mediaFile,
        signId: createdSign.id,
        sourceId,
        signerId
      })

      // WORD — deduplikacja
      const wordNames = word.text
        .split(';')
        .map((w) => titleCase(w.trim()))
        .filter(Boolean)

      for (const wordText of wordNames) {
        let wordId = wordIdMap.get(wordText)

        if (!wordId) {
          wordId = createWord({ ...word, text: wordText }).id
          wordIdMap.set(wordText, wordId)
        }

        // MEANING
        createMeaning({
          ...meaning,
          signId: createdSign.id,
          wordId
        })
      }
    }
  })

  runSeed()
  console.log('[DB] Seed: gotowe.')
}

function titleCase(str: string): string {
  return str.length === 0 ? str : str[0].toUpperCase() + str.slice(1).toLowerCase()
}
