const { app, BrowserWindow, ipcMain, protocol, net, dialog } = require('electron');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');
const { pathToFileURL } = require('url');

// this adds support for local resources (needed for images)
protocol.registerSchemesAsPrivileged([
  { scheme: 'local-resource', privileges: { standard: true, secure: true, supportFetchAPI: true, bypassCSP: true } }
]);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        show: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, './index.html'));

    win.once('ready-to-show', () => {
        win.show();
    });
}

// starts the app and handles the protocol
app.whenReady().then(() => {
  createWindow();

});