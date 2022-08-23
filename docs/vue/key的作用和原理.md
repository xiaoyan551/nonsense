##### react、 vue中的key有什么作用? (key的内 部原理)

1. 虚拟DOM中key的作用:
   * key是虚拟DOM对象的标识，当状态中的数据发生变化时，Vue会根据[新数据]生成[新虚拟DOM]
   * 随后Vue进行[新虚拟DOM]与[旧虚拟DOM]的差异比较，比较规则如下
2. 对比规则:
   * 旧虚拟DOM中找到了与新虚拟DOM相同的key: 
     若虚拟DOM中内容没变，直接使用之前的真实DOM!
     若虑拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
   * 旧虚拟DOM中未找到与新虚拟DOM相同的key
     创建新的真实DOM，随后渲染到到页面。
3. 用index作为key可能会引发的问题:
   * 若对数据进行:逆序添加、逆序删除等破坏顺序操作:
     会产生没有必要的真实DOM更新==>界 面效果没问题，但效率低。
   * 如果结构中还包含输入类的DOM:
     会产生错误DOM更新==>界面有问题。
4. 开发中如何选择key?:
   * 最好使用每条数据的唯一标 识作为key,比如id、 手机号、身份证号、学号等唯一值。 
   * 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

![image-20220221105101858](/image-20220221105101858.png)



##### 为什么data是一个函数

* 因为函数每次调用都返回新的对象，不然每次调用都指向一个对象会导致一个改了，另一个也改

* 官方说法：维护一份被返回对象的独立拷贝

##### ref属性

* 用来给元素或子组件注册引用信息

* 用在html标签上获取的是真实DOM，用在组件上，获取的是组件实例对象

##### mixin混入

可以将多个组件的共用代码抽取，然后通过mixins引入

如果本地和混入都有的变量或方法，以本地优先，混入的生命周期函数都会执行

```javascript
// mixin.js
export const hunru = {
    methods: {
        showName(name) {
            console.log(name)
        }
    },
    // 里面是可以写生命周期钩子、methods、data的
    mounted(){
         console.log('调用了mounted')
    }
}

```

```js
// vue组件中
import {hunru} from './mixin'
export default {
    data(){},
    mixins:[hunru]
}
```

##### 插件

用来给Vue添加全局功能，可以添加全局过滤器、指令、混入、实例方法

**定义插件**

暴露一个install方法，这个方法的第一个参数是Vue构造函数，第二个参数是一个可选的选项对象

```js
// 可以导入组件、mixin等等需要的东西
import xxx from './xxx'
export default {
  // 接收Vue的构造
  install(app,options) {
       // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
      
  // 全局注册组件
  Vue.component(xxx.name, xxx)
}
```

**使用插件**

使用Vue.use('插件')，它需要在你调用 `new Vue()` 启动应用之前完成

```js
// 一般会在main.js导入
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import plugin from './plugin'
......
createApp(App).use(router).use(plugin).mount('#app')
```

