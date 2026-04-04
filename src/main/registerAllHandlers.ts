import { registerAuthorHandlers } from './ipc/author'
import { registerDefinitionHandlers } from './ipc/definition'
import { registerMediaFileHandlers } from './ipc/mediaFile'
import { registerSignHandlers } from './ipc/sign'
import { registerSourceHandlers } from './ipc/source'
import { registerWordHandlers } from './ipc/word'

export function registerAllHandlers(): void {
  registerMediaFileHandlers()
  registerSignHandlers()
  registerSourceHandlers()
  registerWordHandlers()
  registerAuthorHandlers()
  registerDefinitionHandlers()
}
