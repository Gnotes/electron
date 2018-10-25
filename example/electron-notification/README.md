# Electron with Notification

## 环境搭建步骤

> 基于 `electron-react` 添加 Notification 模块，Electron 中有 **两种** Nofitication 模块，一种原生通知，一种基于 HTML5 Notification API.

#### 1. 修改 `main.js` 添加原生 Notification 模块

```diff
- const { app, BrowserWindow } = require('electron')
+ const { app, BrowserWindow, Notification } = require('electron')

+ const Notify = (options) => {
+   if (Notification.isSupported()) {
+     const notification = new Notification(options)
+     notification.show();
+   }
+ }

- win = new BrowserWindow({ width: 800, height: 600 })
+ win = new BrowserWindow({ width: 800, height: 600, show: false })

+  win.once('ready-to-show', () => {
+  win.show();
+  Notify({
+    title: 'Welcome to Electron',
+    body: 'This is original notification.',
+    silent: false,
+  });
+ })
```

#### 2. 修改 `App.js` 添加HTML5 Notification 模块

```diff
+ showNotification = () => {
+   new Notification('Welcome to Electron', {
+     body: 'This is HTML5 notification.',
+     silent: false
+   })
+ }

+ <div className="notify-button" onClick={this.showNotification}>Show Notification</div>
```

#### 3. 修改 `App.css`

```diff
+ .notify-button {
+   display: inline-block;
+   padding: 10px 20px;
+   margin-top: 10px;
+   border: 1px solid transparent;
+   border-radius: 3px;
+ }

+ .notify-button:hover {
+   cursor: pointer;
+   border: 1px solid #61dafb;
+ }
```

#### 4. 启动

```bash
yarn electron-dev
```