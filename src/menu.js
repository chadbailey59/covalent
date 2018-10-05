// ====== CONTENTS OF MENU.JS ==========
exports.createMenu = function(app) {
  var exec = require('child_process').exec;
  const settings = require('electron-settings')
  const electron = require('electron')

  const enableAlwaysOnTop = function(focusedWindow) {
    focusedWindow.setAlwaysOnTop(true);
  }

  const disableAlwaysOnTop = function(focusedWindow) {
    focusedWindow.setAlwaysOnTop(false);
  }

  const enableMiniMode = function(focusedWindow) {
    setWindowMode('mini', focusedWindow);
  }

  const disableMiniMode = function(focusedWindow) {
    setWindowMode('full', focusedWindow);
  }

  const enableAutoFloat = function(focusedWindow) {
    focusedWindow.setAlwaysOnTop(true);
    electron.Menu.getApplicationMenu().items[4].submenu.items[0].enabled = false
    electron.Menu.getApplicationMenu().items[4].submenu.items[0].checked = false
    electron.Menu.getApplicationMenu().items[4].submenu.items[1].enabled = false
    electron.Menu.getApplicationMenu().items[4].submenu.items[1].checked = false
    disableMiniMode(focusedWindow);

    focusedWindow.on('blur', function() {
      enableMiniMode(focusedWindow);
    });
    focusedWindow.on('focus', function() {
      disableMiniMode(focusedWindow);
    });
  }

  const disableAutoFloat = function(focusedWindow) {
    focusedWindow.setAlwaysOnTop(false);
    focusedWindow.removeAllListeners('blur');
    focusedWindow.removeAllListeners('focus');
    electron.Menu.getApplicationMenu().items[4].submenu.items[0].enabled = true
    electron.Menu.getApplicationMenu().items[4].submenu.items[1].enabled = true
  }

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Join Hangout from URL…',
          click(item, focusedWindow, event) {
            focusedWindow.loadURL('file://' + __dirname + '/index.html')
          }
        },
        {
          label: 'Meet Home Page',
          click(item, focusedWindow, event) {
            focusedWindow.loadURL('https://meet.google.com')
          }
        },
        {
          label: 'Move Current Meeting to Chrome',
          click(item, focusedWindow, event) {
            var meetingUrl = focusedWindow.webContents.getURL().replace(/\?.*/, '');
            // remove authuser query param so google can pick it in chrome smartly
            exec(`open -a "Google Chrome" "${meetingUrl}"`, (err, stdout, stderr) => {
              if (err) return;
              focusedWindow.close();
            });
          }
        },

      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
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
      id: 'window',
      submenu: [
        {
          id: 'alwaysontop',
          label: 'Always On Top',
          accelerator: 'CmdOrCtrl+Shift+T',
          type: 'checkbox',
          click(item, focusedWindow) {
            if(focusedWindow) {
              if (item.checked == true) {
                enableAlwaysOnTop(focusedWindow);
              } else {
                disableAlwaysOnTop(focusedWindow);
              }              
            }
          }
        },
        {
          id: 'minimode',
          label: 'Mini Mode',
          accelerator: 'CmdOrCtrl+Shift+M',
          type: 'checkbox',
          click(item, focusedWindow) {
            if(focusedWindow) {
              if (item.checked == true) {
                enableMiniMode(focusedWindow);
              } else {
                disableMiniMode(focusedWindow);
              }
            }
          }
        },
        {
          id: 'autofloat',
          label: 'Auto-Float',
          accelerator: 'CmdOrCtrl+Shift+F',
          type: 'checkbox',
          click(item, focusedWindow) {
            if(focusedWindow) {
              if (item.checked == true) {
                enableAutoFloat(focusedWindow);
              } else {
                disableAutoFloat(focusedWindow);
              }              
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
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ]
    });
    template[3].submenu = [
      { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
      { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
      { label: 'Zoom', role: 'zoom' },
      { type: 'separator' },
      { label: 'Bring All to Front', role: 'front' }
    ];
  }

  const meenu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(meenu);
}

// =====================================


