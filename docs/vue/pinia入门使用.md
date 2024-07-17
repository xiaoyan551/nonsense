pinia是一个状态管理工具，使用起来和vuex非常类似，是vuex5的设计的思路。

和vuex4相比，它使用起来更简单；将actions和mutations进行了合并，不论是同步还是异步操作都在actions中进行。对Ts支持更好，不需要定义太多的类型，能够自己进行类型推断。

#### 安装

```
npm install pinia
```

在main.js中引入使用

```javascript
import { createPinia } from 'pinia'

app.use(createPinia())
```

创建stores/main.js文件

```javascript
import { defineStore } from 'pinia'
// 'main' 是storeId，自己随便取，保证唯一
export const useMainStore = defineStore('main', {
  // 定义state的一种方式
  state: () => {
    return {
      // 所有这些属性的类型都将被自动推断出来  
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

在组件中使用

```javascript
import { useMainStore } from './stores/main.js'
const store = useMainStore()
// console.log(store.$state);
console.log(store.name);

//在template中
 <h1>{{ store.name }}</h1>
```



#### State

##### 创建state

创建state的第一种方法

```javascript
 state: () => {
    return {
      // 所有这些属性的类型都将被自动推断出来  
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
```

创建state的第二种方法

```javascript
  state: () => ({
    counter: 0,
    name: 'Eduardo',
    isAdmin: true
  }),
```

##### 使用state

一般使用

```javascript
import { useMainStore } from './stores/main.js'
const store = useMainStore()
console.log(store.name);
// 模板中
// <h1>{{ store.counter }}</h1> 
```

如果要使导出的数据具有响应式

```javascript
import { storeToRefs } from 'pinia'
import { useMainStore } from './stores/main.js'
// 如果要将数据导出也具有响应式
const { name } = storeToRefs(useMainStore())
// 这时，store中的数据也会变成'xiaoyan'
name.value = 'xiaoyan'
```



#### Getters

##### 定义getter

```javascript
getters: {
    doubleCount: (state) => state.counter * 2,
    // 在getter属性中访问其他的getter属性数据
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    },
    // 可以在里面使用this，在ts中要定义返回值类型，但如果接收了state参数，是不是还要定义返回值类型没有测试
    // doublePlusOne(): number {
    //   return this.counter * 2 + 1
    // },
  },
```

* 可以在getter属性中访问其他getter属性数据
* 可以在getter中通过this访问到state

* 在ts中要定义返回值类型，但如果接收了state参数，是不是还要定义返回值类型没有测试

##### 使用getter

```vue
<script setup>
import { useMainStore } from './stores/main.js'
const store = useMainStore()
</script>
<template>
  <h1>{{ store.doubleCount }}</h1>
</template>
```

##### 将参数传递给 getter

可以从*getter*返回一个函数来接受任何参数

```javascript
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

在组件中使用

```vue
<script>
   import { useStore } from './stores/main.js'
   const store = useStore()
</script>

<template>
User 2: {{ store.getUserById(2) }}
</template>
```

#### Actions

##### 同步

```javascript
  actions: {
    addCount(num) {
      this.counter += num
    }
  }
```

```vue
<script setup>
    import { useMainStore } from './stores/main.js'
    const store = useMainStore()
</script>
<template>
  <button @click="store.addCount(2)">增加</button>
  <h1>{{ store.counter }}</h1>
</template>

```

##### 异步

```javascript
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // let the form component display the error
        return error
      }
    },
  },
})
```



#### 持久化

##### 使用subscribe

可以使用订阅机制subscribe来实现数据的持久化存储

```javascript
const instance = useMainStore();
// 订阅数据变化，变化时存储 instance.$id 这是storeId
instance.$subscribe((mutation, state) => {
  localStorage.setItem(instance.$id, JSON.stringify(state));
});

//init 初始的时候获取
const val = localStorage.getItem(instance.$id);
if (val) {
  instance.$state = JSON.parse(val);
}

```

查看官方示例，也可以通过watch实现

```js
watch(
  pinia.state,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

> 但是需要注意，这种方式持久化会提示pinia未安装挂载，所以需要在pinia挂载后再调用，这里可以将它封装成方法导出，在挂载后调用
>
> ```js
> export const initStore = () => {
>   const instance = useMainStore();
>   // 订阅数据变化，变化时存储 instance.$id 这是storeId
>   instance.$subscribe((mutation, state) => {
>     localStorage.setItem(instance.$id, JSON.stringify(state));
>   });
> 
>   //init 初始的时候获取
>   const val = localStorage.getItem(instance.$id);
>   if (val) {
>     instance.$state = JSON.parse(val);
>   }
> 
> }
> ```
>
> 在main.js后面调用

##### 使用插件

安装

`npm i pinia-plugin-persist --save`

导入

```js
// main.js
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)
createApp(App).use(store).mount('#app')
```

在对应的store中开启

````js
import { defineStore } from 'pinia'
// 'main' 是storeId，自己随便取，保证唯一
export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 2,
    name: 'Eduardo',
    isAdmin: true
  }),
  // ……
  // 开启数据缓存
  persist: {
    enabled: true
  }

})
````

数据默认存在 sessionStorage 里，并且会以 storeId 作为 key

自定义key和存储位置

```js
persist: {
  enabled: true,
  strategies: [
    {
      key: 'user',
      storage: localStorage,
    }
  ]
}
```

 持久化部分 state

```js
state: () => {
  return {
    counter: 2,
    name: 'Eduardo',
    isAdmin: true
  }  
},

persist: {
  enabled: true,
  strategies: [
    {
      storage: localStorage,
      paths: ['name', 'counter']
    }
  ]
}
```

只会存储paths中指定的state字段