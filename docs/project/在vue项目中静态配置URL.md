在vue项目中静态配置URL

1. 在public目录下新建一个config.js文件，在window对象上添加一个属性

```js
window.g = {
    SOCKET_PATH:'ws://10.10.0.219:8080',//websocket地址
  }

```

2. 在全局index.html中引入

```js
<script src="<%= BASE_URL%>config.js"></script>
```

3. 在要使用的地方通过 `window.g`使用

```ts
const SOCKET_PATH = process.env.NODE_ENV !== 'production' ? 'ws://10.10.0.111:8088/ws' : (<any>window).g.SOCKET_PATH//10.10.0.120:8800
```
