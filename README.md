# Electron

> 使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用

> **`Electron`** 为用纯 `JavaScript` 创建桌面应用提供了 **`运行时`**。原理是，Electron调用你在 **`package.json`** 中定义的 `main` 文件并执行它。main文件（通常被命名为main.js）会创建一个内含渲染完的web页面的应用窗口，并添加与你操作系统的原生GUI（图形界面）交互的功能。

> 详细地说，当用Electron启动一个应用，会创建一个主进程。这个主进程负责与你系统原生的GUI进行交互并为你的应用创建GUI（在你的应用窗口）

<div align="center"> 
<img alt="work-flow" src="./flow-chart.png" width="300" > 
<p>—— 《用 Electron 开发桌面应用》</p>
</div>

## Examples

- [hello-world](#)
- [electron-react](#)
- [electron-react-ui](#)
- [electron-forge-react](#)
- [electron-menu](#)

## Tools

- [electron-forge](https://github.com/electron-userland/electron-forge)
> Electron Forge 是一个用来构建现代化Electron应用的完善的工具。 Electron Forge将多个现有的（ 且有稳定维护的 ）Electron构建工具整合为一个简单易用的工具包，所有人都可以用它来快速地搭建Electron开发环境

- [electron-builder](https://github.com/electron-userland/electron-builder)
> Electron Builder 是一个完备的Electron应用打包和分发解决方案，它致力于软件开发的集成体验。

- [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
> 一个 Electron + React 模板，并在内部使用了 electron-builder

## References

- [官网](https://electronjs.org/)
- [中文网](https://electron.org.cn/)

## Articles

- [用 Electron 开发桌面应用](http://get.ftqq.com/7870.get)
- [Electron + React + Node.js + ES6 开发桌面软件](https://blog.csdn.net/mingzznet/article/details/53512475)
- [利用Electron构建桌面应用](https://www.coolecho.net/article/av51)
- [Creating a markdown app with Electron and React](http://kazuar.github.io/markdown-app/)