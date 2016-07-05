const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const {dialog} = require('electron')


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
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
function loadHomepage() {
  mainWindow.loadURL(`https://hangouts.google.com`)
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Join Hangout from URL…',
          accelerator: 'CmdOrCtrl+N',
          click(item, focusedWindow, event) {
            mainWindow.loadURL('file://' + __dirname + '/index.html')
          }
        },
        {
          label: 'Hangouts Home Page',
          accelerator: 'CmdOrCtrl+Shift+H',
          click(item, focusedWindow, event) {
            mainWindow.loadURL('https://hangouts.google.com')
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'pasteandmatchstyle'
        },
        {
          role: 'delete'
        },
        {
          role: 'selectall'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          role: 'togglefullscreen'
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.toggleDevTools();
          }
        },
      ]
    },
    {
      role: 'window',
      submenu: [
        {
          label: 'Always On Top',
          accelerator: 'CmdOrCtrl+T',
          type: 'checkbox',
          click(item, focusedWindow) {
            if(focusedWindow) {
              if (item.checked == true) {
                focusedWindow.setAlwaysOnTop(true);
              } else {
                focusedWindow.setAlwaysOnTop(false);
              }              
            }
          }
        },
        {
          label: 'Tiny Mode',
          accelerator: 'CmdOrCtrl+Shift+T',
          click(item, focusedWindow) {
            if(focusedWindow) {
              mainWindow.setSize(500, 300)
            }
          }
        },
        {
          role: 'minimize'
        },
        {
          role: 'close'
        },
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { require('electron').shell.openExternal('http://electron.atom.io'); }
        },
      ]
    },
  ];

  if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        },
      ]
    });
    // Window menu.
    template[3].submenu = [
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Zoom',
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    ];
  }

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow()
  loadHomepage()
  createMenu()
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
