# 调用Dll文件

ffi-napi只支持electron20以下版本，新的electron可以使用koffi

```js
// 调用 DLL 的代码
const ffi = require('ffi-napi')
const ref = require('ref-napi')

const dllPath = path.join(__dirname, 'libCORXDll.dll')

let myLibrary = null
try {
  // 定义字符串指针类型
  const charPtr = ref.refType(ref.types.CString)

  // 定义 DLL 中的函数
  myLibrary = ffi.Library(dllPath, {
    'query': ['void', ['int', charPtr]],
    'single': ['void', ['int', 'string']],
    'batch': ['void', ['string']]
  })
} catch (error) {
  // console.log('Error loading DLL:', error)
  logger.error('Error loading DLL:', error)
}

/**
 * @param {*} num 1~50
 */
function queryInDll(num) {
  // 定义 bufferLength
  const bufferLength = 1024 // 假设最大长度为 1024

  // 调用 query 函数
  const queryOutputString = Buffer.alloc(bufferLength)
  myLibrary.query(num, queryOutputString)
  const queryResultString = ref.readCString(queryOutputString, 0)
  console.log('Result from query:', queryResultString)
  return queryResultString
}

/**
 * @param {*} num 1~12
 * @param {*} state 'on'/'off'
 */
function singleInDll(num, state) {
  // 调用 single 函数
  myLibrary.single(num, state)
}

/**
 * @param {*} state 'on'/'off'
 */
function batchInDll(state) {
  // 调用 batch 函数
  myLibrary.batch(state)
}

ipcMain.handle('getDevicePort', (event) => {
  console.log('^^^^', event)
  return queryInDll(1)
})

```
