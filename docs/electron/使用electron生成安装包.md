# 生成安装包

## 常规打包

### 1. 安装打包工具

```shell
pnpm i electron-builder -D
```

### 2. 在packge.json中配置打包信息

```json
{
  "name": "react-admin", // 在c盘Roaming中生成的文件夹是这个名字
  "private": true,
  "version": "1.0.0", // 版本号，可以在主进程中通过app获取，后期版本判断就靠它
  "type": "module",
  "description": "学习electron", // 描述，win中鼠标在图标停留就显示他
  "author": "xxxx有限公司", // win中， 安装的应用页面显示的作者
  "main": "electron/index.js", // 主进程入口文件
  "scripts": {
   "dev": "vite",
   "build": "tsc && vite build",
   "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
   "preview": "vite preview",
   "start": "electron .",
   "electron:build": "tsc && vite build && electron-builder" // 打包命令，tsc && vite build为前端打包命令，electron-builder为electron打包命令
  },
  "build": {
   "appId": "com.example.app", // 应用id，包名
   "productName": "ReactAdmin", // 桌面名称
   "artifactName": "${productName}-${version}-${arch}.${ext}", // 生成的安装包名称
   "copyright": "Copyright © 2024 ${author}",
   "directories": {
     "buildResources": "assets", // 构建的资源目录
     "output": "release" // 生成的安装包存放目录
   },
   "files": [ // electron 打包的资源
     "dist/**/*",
     "electron/**/*"
   ],
   "mac": { // mac安装包配置
     "icon": "./public/icon.icns",
     "category": "public.app-category.productivity",
     "target": [
       "dmg"
     ]
   },
   "dmg": { // dmg安装窗口配置，图标生成参考https://www.jianshu.com/p/33df84bb52c2
     "contents": [
       {
         "x": 410,
         "y": 150,
         "type": "file"
       },
       {
         "x": 130,
         "y": 150,
         "type": "link",
         "path": "/Applications"
       }
     ],
     "window": {
       "width": 540,
       "height": 380,
       "x": 410,
       "y": 150
     }
   },
   "win": { // windows 安装包配置
     "icon": "./public/launch.png", // 桌面图标位置
     "requestedExecutionLevel": "highestAvailable" // 申请管理员权限安装
   },
   "nsis": {
     "oneClick": false, // 是否一键安装
     "perMachine": false, // 是否安装给所有用户
     "allowToChangeInstallationDirectory": true // 是否可以设置安装目录
   }
  },
  "dependencies": {
      ……
  }
  ……
｝
```

   现在运行`pnpm electron:build`就可用生成安装包了

> 打包可能的报错
> 
> 运行打包的时候会去npm下载对应的系统版本，所以很有可能会报错，需要在npm config设置electron镜像
> 
> ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/" 

## 生成各种系统版本的安装包

默认情况下打包生成的是当前打包电脑对应的安装包，如果我们想生成其他系统版本的安装包就需要配置; 不过mac版本，需要mac电脑才能生成

### 可通过scripts参数配置

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "start": "electron .",
    "electron": "electron-builder",
    "electron:build": "tsc && vite build && electron-builder",
    "electron:build-mac": "electron-builder --mac --x64",
    "electron:build-mac-arm64": "electron-builder --mac --arm64",
    "electron:build-mac-universal": "electron-builder --mac --x64 --arm64",
    "electron:build-win": "electron-builder --win --x64",
    "electron:build-win-ia32": "electron-builder --win --ia32",
    "electron:build-win-universal": "electron-builder --win --x64 --ia32"
  },
```

## electron主进程代码压缩

安装好打包的应用后，打开安装目录，进入rsources文件，可以看到有个app.asar文件，这个文件是可以直接用一些解压缩工具直接解压的，解压后得到的就是package.json -> build -> files下配置文件和node_modules、package.json文件。

这其中的electron主进程文件是没有任何压缩混淆的，所以需要在打包的时候对主进程文件进行压缩。

所以这里的思路是在打包前通过node.js 将主进程文件复制一份备份，然后使用javascript-obfuscator库将所有主进程文件压缩，之后再执行相应的打包操作。打包完成将主进程文件删除，将备份的没压缩过的再复制过来。

### 安装用的包

```shell
pnpm i javascript-obfuscator -D
pnpm i fs-extra -D
```

### 编写压缩程序

```js
// confuse.js
import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import JavaScriptObfuscator from 'javascript-obfuscator'
import { exec } from 'child_process'

const sourceDir = './electron'
const backupDir = './electron_backups' // 备份目录

if (process.argv.length < 3) {
  console.log('请指定要执行的命令，例如："build"')
  process.exit(1)
}
const exeCom = process.argv[2]

fsExtra.emptyDirSync(backupDir)
fsExtra.copySync(sourceDir, backupDir)
fsExtra.emptyDirSync(sourceDir)

fs.readdir(backupDir, (err, files) => {
  if (err) {
    console.error(err)
    return
  }
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const backupPath = path.join(backupDir, file)
      const sourcePath = path.join(sourceDir, file)
      fsExtra.ensureFileSync(sourcePath) //  确保符号链接存在。如果目录结构不存在，则创建它

      const code = fs.readFileSync(backupPath, 'utf-8')
      const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        stringArray: true,
        stringArrayThreshold: 1
      })

      fs.writeFileSync(sourcePath, obfuscatedCode.getObfuscatedCode(), 'utf-8')
    }
  })

  // 执行打包
  exec(`npm run ${exeCom}`, (error, stdout, stderr) => {

    fsExtra.emptyDirSync(sourceDir)
    fsExtra.copySync(backupDir, sourceDir)

    // 删除备份文件
    fsExtra.removeSync(backupDir)
    if (error) {
      console.error(`执行打包命令时出错: ${error}`)
      return
    }
    console.log(`打包完成: ${stdout}`)
    console.error(`stderr: ${stderr}`);
  })
})
```

### 添加scripts

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "start": "electron .",
    "electron": "electron-builder",
    "electron:build": "tsc && vite build && electron-builder",
    "electron:build-mac": "electron-builder --mac --x64",
    "electron:build-mac-arm64": "electron-builder --mac --arm64",
    "electron:build-mac-universal": "electron-builder --mac --x64 --arm64",
    "electron:build-win": "electron-builder --win --x64",
    "electron:build-win-ia32": "electron-builder --win --ia32",
    "electron:build-win-universal": "electron-builder --win --x64 --ia32",
    "confuse": "node confuse.js electron:build"
  },
```

这里添加了 `"confuse": "node confuse.js electron:build`,当在终端运行 npm run confuse时，实际会用node 来执行confuse.js文件，后面的 electron:build为参数，在confuse.js中通过 process.argv 能获取到，而之后通过 child_process 中的 exec 执行获取到的 后面的参数

### 更好的代码保护措施

其实代码压缩也只是最简易的代码保护，更多的代码保护措施可用参考[源代码保护 | electron-vite](https://cn.electron-vite.org/guide/source-code-protection)中的介绍，如果从头起electron项目也更推荐直接使用electron-vite
