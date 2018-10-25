const { app, BrowserWindow, Menu, MenuItem, globalShortcut, ipcMain } = require('electron');
const template = require('./menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
}

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 800, height: 600 })
  // 添加上下文菜单
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  // 注册快捷键
  globalShortcut.register('CmdOrCtrl+Shift+I', () => {
    console.log('输出：CmdOrCtrl+Shift+I')
  })

  // ================================================
  // 然后加载应用的远程资源URL。
  //
  // 不同的就是这个地方，开发模式下加载React本地服务
  // ================================================
  win.loadURL('http://localhost:3000');

  // 打开开发者工具
  win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
const menu = new Menu()
menu.append(new MenuItem({ label: 'I\'m Right Menu' }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))

ipcMain.on('on-show-context-menu', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})