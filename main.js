const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('index.html');
});

ipcMain.handle('save-file', async (event, content) => {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Zapisz dokument jako',
    defaultPath: 'document.docx',
    filters: [{ name: 'Dokumenty Word', extensions: ['docx'] }],
  });

  if (filePath) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
