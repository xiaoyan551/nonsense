# webpack打包时，将当前git信息写入项目

```js
// buildInfo.js

const child_process = require('child_process')

// git 提交记录信息 https://git-scm.com/docs/git-show    https://git-scm.com/docs/git
const commitHash = child_process.execSync('git show -s --format=%H').toString().trim()
const localBranchName = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
const branchName = child_process.execSync(`git rev-parse --abbrev-ref ${localBranchName}@{upstream}`).toString().trim()
const commitDateObj = new Date(child_process.execSync('git show -s --format=%cd').toString())
const commitDate = `${commitDateObj.getFullYear() + '-' + (commitDateObj.getMonth() + 1) + '-' + commitDateObj.getDate() + '  ' + commitDateObj.getHours() + ':' + commitDateObj.getMinutes()}`
const commitAuthor = child_process.execSync('git show -s --format=%an').toString().trim()
const commitMessage = child_process.execSync(`git log -1 --pretty=%B`).toString().trim()
const nowDate = new Date()
const buildDate = `${nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + '  ' + nowDate.getHours() + ':' + nowDate.getMinutes()}`
module.exports = {
  branchName,
  commitHash,
  commitMessage,
  commitAuthor,
  commitDate,
  buildDate
}

```

```js
// vue.config.js

const buildInfo = require('./buildInfo.js')

//……
chainWebpack(config) {
    config.plugin('define').tap(args => {
      args[0].buildInfo = JSON.stringify(buildInfo)
      return args
    })
  }
```
