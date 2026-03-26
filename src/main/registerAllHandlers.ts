import { registerMeaningsHandlers } from './ipc/meaning'
import { registerMediaFileHandlers } from './ipc/mediaFile'
import { registerSignHandlers } from './ipc/sign'
import { registerSignerHandlers } from './ipc/signer'
import { registerSourceHandlers } from './ipc/source'
import { registerWordHandlers } from './ipc/word'

export function registerAllHandlers(): void {
  registerMediaFileHandlers()
  registerSignerHandlers()
  registerSignHandlers()
  registerMeaningsHandlers()
  registerSourceHandlers()
  registerWordHandlers()
}
