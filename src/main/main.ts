/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

import log from 'electron-log';
import Store from 'electron-store';
import { Alert } from './library';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const store = new Store();
// const icp = ipcRenderer;
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  // Store

  ipcMain.on('ipc-message-dialog', async (event, message) => {
    const msgTemplate = (pingPong: string) => `Reply: ${pingPong}`;
    const swalOptions = {
      position: 'top-end',
      title: message,
      icon: 'success',
      showConfirmButton: true,
      timer: 3000,
    };

    Alert.fireToast(swalOptions);
    event.reply('ipc-message-dialog', msgTemplate(message));
    // dialog
    //   .showMessageBox(mainWindow, {
    //     message: `${message}`,
    //     type: 'info',
    //     title: 'Thông báo',
    //     buttons: ['Xác nhận'],
    //     defaultId: 0
    //   })
    //   .then(result => {
    //     if (result.response === 0) {

    //     }
    //   })
  });
  ipcMain.on('ipc-error-dialog', async function (event, message) {
    dialog.showMessageBox(mainWindow, {
      message,
      type: 'error',
      title: 'Lỗi',
    });
    const msgTemplate = (pingPong: string) => `Reply: ${pingPong}`;
    event.reply('ipc-error-dialog', msgTemplate(message));
  });

  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val);
  });
  ipcMain.on('electron-store-set', async (_event, key, val) => {
    store.set(key, val);
  });

  // EndStore

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return {
      action: 'deny',
    };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // trigger autoupdate check

  // if (isDevelopment) {
  //   // Skip autoupdate check
  // } else {

  // }
  autoUpdater.checkForUpdates();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

// Auto Update
function sendStatusToWindow(text: string) {
  console.log(text);
  mainWindow.webContents.send('message', text);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
autoUpdater.on('update-available', () => {
  sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', () => {
  sendStatusToWindow(`update-not-available`);
});
autoUpdater.on('error', (err) => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on('download-progress', (progressObj) => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow('Update downloaded; will install now');
});

autoUpdater.on('update-downloaded', () => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately
  autoUpdater.quitAndInstall();
});
