# Electron with React

## 环境搭建步骤

#### 1. 使用 `create-react-app` 新建项目

```bash
create-react-app electron-react
```

#### 2. 检查项目是否正常运行

```bash
yarn start # npm start
```

#### 3. 安装Electron

```bash
yarn add electron -D
```

##### 3.1 安装依赖

```bash
yarn add concurrently wait-on cross-env -D
```

参见 [附录](#附录)

#### 4. 添加执行命令

- package.json

```json
"scripts": {
  "electron-dev": "concurrently \"cross-env BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\""
}
```

- 命令解析

> 同时(`concurrently`) 执行 `yarn start` 和 `wait-on http://localhost:3000 && electron .` 命令，在启动 `React` 服务时指定 `BROWSER=none`，即不打开浏览器；等待(`wait-on`) 服务 `http://localhost:3000` 可用时，执行 `electron .`

#### 5. 添加主入口

- package.json

```json
"main": "main.js",
```

##### 5.1 添加 `main.js`

```js
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 800, height: 600 })

  /**
   * 然后加载应用的远程资源URL。
   * 不同的就是这个地方，开发模式下加载React本地服务
   */
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
```

#### 6. 启动

```bash
yarn electron-dev
```

## 附录

- [concurrently](https://www.npmjs.com/package/concurrently) : 同时启动多个命令
- [wait-on](https://www.npmjs.com/package/wait-on) : 等待服务或资源文件可用时返回