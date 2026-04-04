import { registerAuthorHandlers } from './ipc/author'
import { registerDefinitionHandlers } from './ipc/definition'
import { registerSignHandlers } from './ipc/sign'
import { registerSourceHandlers } from './ipc/source'
import { registerWordHandlers } from './ipc/word'

export function registerAllHandlers(): void {
  registerSignHandlers()
  registerSourceHandlers()
  registerWordHandlers()
  registerAuthorHandlers()
  registerDefinitionHandlers()
}
