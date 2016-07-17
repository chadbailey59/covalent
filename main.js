const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ElectronSettings = require('electron-settings')
var menu = require('./src/menu')

let settings = new ElectronSettings();
if (settings.get('homepage') === undefined) settings.set('homepage', 'https://hangouts.google.com')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768})
  // if I want to make it Mavericks-style: titleBarStyle: 'hidden' above
  // see http://electron.atom.io/docs/api/frameless-window/ for how to add a
  // draggable region, etc

  // and load the index.html of the app.

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
function loadHomepage() {
  openUrl(settings.get('homepage'))
}

function openUrl(url) {
  mainWindow.loadURL(url)
  mainWindow.webContents.on('did-finish-load', function() {
    console.log("firing did-finish-load")
    mainWindow.webContents.executeJavaScript(`

      // Load the script
      var script = document.createElement("SCRIPT");
      script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';
      script.type = 'text/javascript';
      document.getElementsByTagName("head")[0].appendChild(script);
      // Poll for jQuery to come into existance
      var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
      };

      // Start polling...
      checkReady(function($) {
        // Use $ here...
        console.log('ok now jquery is ready with the new way', $)
      });

      function loadScript(url, callback) {
        var script = document.createElement("script")
        script.type = "text/javascript";
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
      }
      loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js", function () {
      });
    `)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow()
  loadHomepage()
  menu.createMenu(app)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('open-url', function(event, url) {
  event.preventDefault()
  if (mainWindow === null) {
    createWindow()
  }
  mainWindow.loadURL(url)
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
