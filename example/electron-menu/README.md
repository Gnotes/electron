# Electron with Menu

## 环境搭建步骤

> 基于 `electron-react` 添加 menu

#### 1. 添加上下文菜单模板文件 `menu.js`

```js
const template = [
  {
    label: 'Edit',
    submenu: [
      { label: '菜单1', accelerator: 'CmdOrCtrl+Shift+I', },
      { label: '菜单2', accelerator: 'Alt+I', },
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

module.exports = template;
```

#### 2. 修改 `main.js` 添加菜单模板

```diff
- const { app, BrowserWindow } = require('electron');
+ const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
+ const template = require('./menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

+ if (process.platform === 'darwin') {
+   template.unshift({
+     label: app.getName(),
+     submenu: [
+       { role: 'about' },
+       { type: 'separator' },
+       { role: 'services', submenu: [] },
+       { type: 'separator' },
+       { role: 'hide' },
+       { role: 'hideothers' },
+       { role: 'unhide' },
+       { type: 'separator' },
+       { role: 'quit' }
+     ]
+   })
+ }

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 800, height: 600 })
+  // 添加上下文菜单
+  const menu = Menu.buildFromTemplate(template)
+  Menu.setApplicationMenu(menu);
+  // 注册快捷键
+  globalShortcut.register('CmdOrCtrl+Shift+I', () => {
+    console.log('输出：CmdOrCtrl+Shift+I')
+  })
}
```

#### 3. 启动

```bash
yarn electron-dev
```
