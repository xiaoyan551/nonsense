#### 异步

JavaScript是单线程的，同步代码就会造成线程阻塞，当进行耗时操作时，同步会阻塞之后的代码执行，而异步就不会有这个问题。

异步在调用发出后调用就直接返回，调用结果由被调用者通过回调函数来处理。

>  异步的发展：回调函数 -> Promise(ES6) -> Generator(ES6) -> async/await(ES7)

#### Promise

*　Promise是js中进行异步编程的解决方案，Promise对象用来封装一个异步操作并可以获取其结果。
*　promise指定回调的方式更灵活，回调函数的方式必须在启动异步任务指定回调函数，promise可以再异步任务开启后再指定回调函数



#### 事件循环Event Loop

同步代码执行时会进调用栈直接执行，异步代码会进对应的线程等待，同步代码执行完成才会执行异步代码

```javascript
    setTimeout(() => {
      console.log(1);
    }, 20);
    console.log(2);

    setTimeout(() => {
      console.log(3);
    }, 10);
    console.log(4);

    for (let i = 0; i < 900000000; i++) {

    }// 循环耗时33ms左右
    console.log(5);

    setTimeout(() => {
      console.log(6);
    }, 20);
    console.log(7);

    setTimeout(() => {
      console.log(8);
    }, 10);

    // 输出顺序 2 4 5 7  3 1 8 6
    /**
     * 先执行同步任务输出2 4 5 7
     * 忽略循环外同步代码执行时间，3、1分别在第10、20ms进入任务队列
     * 8、6由于循环耗时在33+10、33+20ms才进入任务队列
     * 所以3、1先输出，8、6后输出
     **/

```



##### 宏任务和微任务

__宏任务macro-task__

* setTimeout/setInterval/setImmediate
* requestAnimationFrame
* I/O流
* UI render（页面渲染）
* ajax请求

__微任务micro-task__

* process.nextTick
* Promise(promise().then()之前是同步的)
* Async/await
* MutationObserver

##### 宏任务和微任务的执行流程

先执行主线程（同步）-> 执行微任务 -> 宏任务

![image-20220210142756602](/image-20220210142756602.png)

![image-20220210143333899](/image-20220210143333899.png)