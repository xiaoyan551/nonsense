# electron 基本使用

## 1. 安装electron 依赖

```shell
pnpm i electron -D
```

### electron镜像设置
electron包大概率会下载失败，所以需要设置npm镜像和ELECTRON_MIRROR镜像

```shell
npm config set registry https://registry.npmmirror.com/
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
```


## 2. 创建electron入口文件

在根目录创建 /electron/index.js, 这也是electron的主进程，而加载的前端页面就是渲染进程

```js
import { app, BrowserWindow } from 'electron'
import path from 'path'

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  loadPage()
}

function loadPage() {
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
    // mainWindow.loadURL('http://localhost:8100/')
    // mainWindow.webContents.openDevTools()
  } else {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:8100/') // 这是你本地运行的地址
  }
}

/**
 * 当应用准备好时
 */
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
```
> 注意：
> 最好使用hash路由，使用history路由很难加载到对应的页面


## 3. 在package.js中配置

设置刚刚创建的入口文件

```json
……
"main": "electron/index.js",
```

添加scripts

```json
 "scripts": {
    ……
    "start": "electron ."
  },
```

这时候运行 `pnpm start` 就可以看到electron应用跑起来了
