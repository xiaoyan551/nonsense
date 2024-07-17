# axios封装

* 请求结果始终返回一个数组，数组第一个元素为错误信息，第二个元素为请求结果
* 响应拦截中统一处理错误信息，不管是http错误还是业务错误，统一返回一个对象，包含code和message
* 响应拦截中直接返回data
* 请求方法中都可以传递config，config中可以设置请求取消、请求头等

## 代码

```ts

import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
  // 设置请求头
  
  return config
})

axiosInstance.interceptors.response.use((response) => {
  if (response.data.code !== 200){
    return Promise.reject({code: response.data.code, message: response.data.message})
  }
  return response.data
},(err) => {
  const errMessage = handleNetworkError(err.response.status)
  return Promise.reject({  code: err.response.status, message: errMessage})
})

export function get<T>(url: string, params?: any, config: AxiosRequestConfig = {}): Promise<[ any, T|undefined]> {
  return new Promise((resolve) => {
    axiosInstance.get(url, { params, ...config })
      .then((res) => {
        resolve([null, res.data as T])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export function post<T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<[ any, T|undefined] > {
  return new Promise((resolve) => {
    axiosInstance.post(url, data, config)
      .then((res) => {
        resolve([null, res.data as T])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
  
export default axiosInstance



// handleNetworkError 错误处理可以单独放一个文件

const handleNetworkError = (errStatus:number) => {
  let errMessage = '未知错误'
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = '错误的请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${errStatus}`
    }
  }
  return errMessage
}


```

## 使用

```ts
import { post } from './request'

export type LoginResult = {
  token:string;
}

export const login = ({user:string, password:string}) => {
  return post<LoginResult>('/login', {user, password})
}
```

```ts

import { login } from './api'

const [err, res] = await login({user: 'admin', password: '123456'})
if (err) {
  console.log('登录失败', err)
} else {
  console.log('登录成功', res)
}
```
