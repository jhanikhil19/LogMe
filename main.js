const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer', 'index.js'),
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    return result.filePaths[0];
});

ipcMain.handle('save-items', async (event, { directory, items, format }) => {
    const filePath = path.join(directory, `items.${format}`);
    if (format === 'json') {
        fs.writeFileSync(filePath, JSON.stringify(items, null, 4), 'utf-8');
    } else if (format === 'xml') {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<items>\n';
        items.forEach(item => {
            xml += `  <item>${item}</item>\n`;
        });
        xml += '</items>';
        fs.writeFileSync(filePath, xml, 'utf-8');
    }
    return filePath;
});