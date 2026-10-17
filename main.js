// Обёртка для ПК (Windows/Linux): открывает игру в отдельном окне на весь экран
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 720, backgroundColor: '#0a0610',
    icon: path.join(__dirname, 'icons', 'icon-512.png'),
    autoHideMenuBar: true, fullscreen: true,
    webPreferences: { contextIsolation: true }
  });
  Menu.setApplicationMenu(null);
  win.loadFile('index.html');
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
