const electron = require('electron')
import { app, BrowserWindow } from 'electron';
const settings = require('electron-settings')

// used as a global to manage window modes: current values are
// 'full' and 'mini'
global.windowMode = 'full';

global.setWindowMode = function(mode, theWindow) {
  global.windowMode = mode
  theWindow.setBounds(getWindowBounds());
}

function screenSize() {
  var s = electron.screen.getPrimaryDisplay().workAreaSize;
  var screenSize = `${s.width}x${s.height}`;
  return screenSize;
}

function getWindowBounds() {
  var key = `windowBounds.${screenSize()}.${global.windowMode}`;
  var defaultKey = `windowBounds.default.${global.windowMode}`;
  var defaultBounds = settings.get(defaultKey);
  var bounds = settings.get(key, defaultBounds);
  return bounds;
}

function setWindowBounds(theWindow) {
}

var storeWindowBoundsTimer;
function storeWindowBounds(theWindow) {

  clearTimeout(storeWindowBoundsTimer);
  storeWindowBoundsTimer = setTimeout( () => {
    settings.set(`windowBounds.${screenSize()}.${global.windowMode}`, theWindow.getBounds());
  }, 500);
}

function initSettings() {
  const defaultSettings = [
    [ 'homepage', 'https://meet.google.com' ],
    [ 'windowBounds', {'default': 
      {'full': {x: 100, y: 20, width: 1024, height: 768},
        'mini': {x: 0, y: 0, width: 450, height: 280}}}
    ]
  ]
  defaultSettings.forEach(setting => {
    if (settings.get(setting[0]) === undefined) settings.set(setting[0], setting[1])
  });
}

var menu = require('./menu');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  global.windowMode = 'full';
  // new BrowserWindow accepts a whole bunch of stuff
  // but we're cheating and just passing the bounds
  // stuff we care about: x, y, width, height
  mainWindow = new BrowserWindow(getWindowBounds());

  // and load the index.html of the app.
  mainWindow.loadURL(settings.get('homepage'));
  mainWindow.mini = false;
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on('moved', () => {storeWindowBounds(mainWindow)} );
  mainWindow.on('resize', () => {storeWindowBounds(mainWindow)} );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  initSettings();
  createWindow();
  menu.createMenu(app);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// for opening from Choosy, etc
app.on('open-url', function(event, url) {
  event.preventDefault()
  if (mainWindow === null) {
    createWindow()
  }
  mainWindow.loadURL(url)
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
