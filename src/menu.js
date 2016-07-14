exports.createMenu = function(app) {
  var electron = require('electron')
  var template = [
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

  menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);
}

