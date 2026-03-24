import { registerMeaningsHandlers } from './ipc/meanings'
import { registerMediaFileHandlers } from './ipc/media_files'
import { registerSignsHandlers } from './ipc/signs'
import { registerSignerHandlers } from './ipc/signers'
import { registerSignsRelationHandlers } from './ipc/signs_relations'
import { registerSourceHandlers } from './ipc/sources'
import { registerWordsHandlers } from './ipc/words'

export function registerAllHandlers(): void {
  registerMediaFileHandlers()
  registerSignerHandlers()
  registerSignsHandlers()
  registerSignsRelationHandlers()
  registerMeaningsHandlers()
  registerSourceHandlers()
  registerWordsHandlers()
}
