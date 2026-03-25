import { app, shell, BrowserWindow, ipcMain, protocol, net } from 'electron'
import { join } from 'path'
import { pathToFileURL } from 'url'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { registerAllHandlers } from './registerAllHandlers'
import { getDb } from './db/client'

protocol.registerSchemesAsPrivileged([
  { scheme: 'media', privileges: { secure: true, supportFetchAPI: true, stream: true } }
])

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'media',
    privileges: {
      secure: true,
      supportFetchAPI: true,
      stream: true
    }
  }
])

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  protocol.handle('media', (req) => {
    const url = req.url
    console.log('[media] raw url:', url)

    let filePath = decodeURIComponent(url.replace('media://', ''))

    if (!filePath.startsWith('/')) {
      filePath = '/' + filePath
    }

    console.log('[media] filePath:', filePath)
    return net.fetch(pathToFileURL(filePath).toString())
  })

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  registerAllHandlers()
  getDb()
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
