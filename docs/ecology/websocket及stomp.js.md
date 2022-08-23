### websocket

##### 服务端(node)

安装`nodejs-websocket`

``` js
npm i nodejs-websocket
```

编写最基本的服务的代码,可以查看文档https://github.com/sitegui/nodejs-websocket

```js
var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function (conn) {
  // 这里可以监听文本数据、二进制数据等
  conn.on("text", function (str) {
    console.log("message:" + str)
    conn.sendText("你好，我是服务端");
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8001)
console.log("listening on *:8001")

```

##### 客户端

自html5开始，是本身支持websocket的，所以不需要引入其他第三方库就能直接使用

参考：[webSocket 前端如何实现_chuangshaoxia5899的博客-CSDN博客](https://blog.csdn.net/chuangshaoxia5899/article/details/101058805)

```js
// 
const ws = new WebSocket('ws://10.10.0.99:8001')
ws.onopen = function () {
  ws.send('你好，我是客户端')
}

ws.onmessage = function (e) {
  console.log("接收到服务端消息" + e.data)
}

ws.onclose = function (e) {
  console.log("服务关闭");
}
ws.onerror = function () {
  console.log("连接出错");
}
```

### stomp.js

从上面的websocket简单使用可以看出，websocket是非常简单的，但是他不能像常规的http访问一样请求接口，我们想要按接口一样请求不同的数据，就需要使用socket.io.js或者stomp.js。

这里我们主要介绍stomp，stomp.js是一个stomp协议的js实现，stomp是一个基于websocket的协议。

>  stomp官方有比较详细的使用文档：[使用 StompJs v5+ - StompJS 系列 (stomp-js.github.io)](https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html)和简单示例[samples/chat.html at master · stomp-js/samples (github.com)](https://github.com/stomp-js/samples/blob/master/stompjs/chat/chat.html)

##### 客户端使用

没有找相关的node服务端代码，公司服务端是由java完成的，所以这里就只介绍客户端了

先安装依赖 `npm i @stomp/stompjs`

```js
import { Client } from '@stomp/stompjs'
mounted () {
    this.initStompData()
}
// stomp实例
let stompClient;

// 连接配置文件
const stompConfig = {
    // Typically login, passcode and vhost
    // 连接头信息，通常是认证登录信息
    connectHeaders: {
        login: "guest",
        passcode: "guest"
    },

    // 连接url，应该以 ws:// or wss:// 开头
    brokerURL: "ws://localhost:15674/ws",

    // debug
    debug: function (str) {
        console.log('STOMP: ' + str);
    },

    // 失败重连时间，200毫秒
    reconnectDelay: 200,

    // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
    // 连接成功的监听，订阅应该在他内部完成
    onConnect: function (frame) {
        // The return object has a method called `unsubscribe`
        // 订阅/topic/chat这个即可，返回的对象有一个unsubscribe的方法
        const subscription = stompClient.subscribe('/topic/chat', function (message) {
            const payload = JSON.parse(message.body);
            // 接收到订阅的消息
        });
    }
}

initStompData(){
    // 创建实例
    stompClient = new Client(stompConfig);
    const payLoad = { user: user, message: message };
    // 向服务端/topic/chat 发送数据，body只支持字符串，所以对象数据需转成字符串发送
    // 当然也可以通过headers发送，支持对象形式
    stompClient.publish({destination: '/topic/chat', body: JSON.stringify(payLoad)});
    // stompClient.publish({destination: '/topic/chat', headers: payLoad});
    
    // 发生错误的监听
    client.onStompError = function(frame) {
      console.info('Broker reported error:' + frame.headers['message']);
      console.info('Additional details:' + frame.body);
    }
    
    // 开启连接
    client.activate()
}
    

```

