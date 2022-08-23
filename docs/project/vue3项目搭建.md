###  vite + ts 项目搭建

#### 创建项目

```javascript
// 1. 全局安装vite
npm i vite -g
// 2. 创建项目
npm init vite@latest
// 3. 输入项目名称，选择模板
// 4. 按提示运行npm install ， npm run dev
```
![image-20220106103432239](/image-20220106103432239.png)

看上面的截图，这里面没有vue+ts 所以后面要手动添加ts，如果有vue+ts直接选择就好。

**vite.config.js **
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 不使用jsx、tsx不需要安装
import vueJsx from '@vitejs/plugin-vue-jsx'
// path需要安装 npm install @types/node --save-dev
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', //use `--host` to expose
    port: 8099,
    open: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src')
    },
  },
  plugins: [vue(), vueJsx()]
})
```



#### 集成ts

1. 安装ts

   `npm i typescript -S`

2. 创建tsconfig.json 文件

   `npx tsc --init`

3. 将main.js改成main.ts，index.html引入也改成mian.ts

4. 在项目根目录创建shim.d.ts文件，文件内 写入以下文件，用于ts识别.vue文件

```typescript
declare module "*.vue" {
	import { Component } from "vue";
	const component: Compoent;
	export default component;
}
```

**tsconfig.json **

```json
{
  "compilerOptions": {
	  "target": "es2016", 
      "jsx": "preserve",
      "module": "esnext",
      "moduleResolution": "node",
      "baseUrl": "./", 
      "paths": {
          "@/*": [
            "src/*"
          ]
       }, 
      "strict": true,
       "skipLibCheck": true
  }
}
```



#### 集成eslint

1. 安装`npm install eslint -D`

2. 初始eslint配置 `npx eslint --init`

   在这里有很多的配置项，配置规则如下

   ```
   How would you like to use ESLint?  ... # 如何使用eslint
   To check syntax only  # 仅检测语法
   To check syntax and find problems   # 检测语法并发现问题
   > To check syntax, find problems, and enforce code style# 检测语法并发现问题，加强风格
   # 这里选最后一项
   
   What type of modules does your project use?  ... # 用什么模块化规范
   > JavaScript modules (import/export) # 选这个就好
   CommonJS (require/exports) 
   None of these
   
   Which framework does your project use?  ... # 用什么框架
   React 
   > Vue.js # 选这个
   
   Does your project use TypeScript?  » No / Yes # 是否用ts
   
   
   Where does your code run?  ...   (Press <space> to select, <a> to toggle all, <i> to invert selection) # 代码运行在哪里 按空格切换
   √ Browser # 默认选浏览器就好
   √ Node 
    
   ?  How would you like to define a style for your project?  ... # 如何为你的项目定义风格
   > Use a popular style guide  # 使用流行的风格，这样就会像vuecli那样让你选
   Answer questions about your style 
   Inspect your JavaScript file(s) 
    
   ?  Which style guide do you want to follow?  ... # 使用哪一种风格指南
   Airbnb: https://github.com/airbnb/javascript 
   > Standard: https://github.com/standard/standard # 这个只支持7.12.1，可能需要降级
   Google: https://github.com/google/eslint-config-google 
   XO: https://github.com/xojs/eslint-config-xo 
    
   ?  What format do you want your config file to be in?  ... # 配置文件格式
   > JavaScript 
   YAML 
   JSON 
    
   Checking peerDependencies of eslint-config-standard@latest 
   The config that you've selected requires the following dependencies: 
    
   eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-standard@latest eslint@^7.12.1 eslint-plugin-import@^2.22.1 eslint-plugin-node@^11.1.0 eslint-plugin-promise@^4.2.1 || ^5.0.0 @typescript-eslint/parser@latest 
   ?  Would you like to install them now with npm? # 需要上面那些依赖，是否现在从npm下载安装
    
   + eslint-plugin-import@2.23.4 
   + eslint-plugin-node@11.1.0 
   + eslint-config-standard@16.0.3 
   + eslint-plugin-vue@7.11.1 
   + eslint@7.29.0 
   + @typescript-eslint/parser@4.27.0 
   + @typescript-eslint/eslint-plugin@4.27.0 
   + eslint-plugin-promise@5.1.0
   
   ```

   执行完上面的操作在根目录创建了一个文件`.eslintrc.js`,里面记录了配置规则，在里面进行如下修改

   ```javascript
     extends: [
       // 'plugin:vue/essential',// 这是vue2用的
       // 使用 Vue 3 规则
       // https://eslint.vuejs.org/user-guide/#bundle-configurations
       'plugin:vue/vue3-essential',
       'standard'
     ],
   ```

   在`.eslintrc.js`里面添加globals忽略,不然使用这些时会报错

   ```js
   module.exports = {
     globals: {
       defineProps: "readonly",
       defineEmits: "readonly",
       defineExpose: "readonly",
       withDefaults: "readonly"
     }
   }
   ```



#### 集成router

1. 安装

   `npm install vue-router@4`

2. 创建router/index.ts文件

   ```typescript
   import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
   import HelloWorld from '@/components/HelloWorld.vue'
   const routes: Array<RouteRecordRaw> = [
     {
       path: '/',
       name: 'home',
       component: HelloWorld
     }
   ]
   
   const router = createRouter({
     history: createWebHashHistory(),
     routes
   })
   export default router
   
   ```

3. 在main.ts中导入使用

   `import router from './router/index'`

   `app.use(router)`

**如果以模块（module）的形式使用router **

1. 在router中创建module目录

2. 在module中创建一个模块的router文件

   如：setting.ts

```typescript
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    component: () => import('@/pages/Settting.vue'),
    path: '/setting',
    redirect: { name: 'authority' },
    children: [
      {
        path: 'authority',
        name: 'Authority',
        component: () => import('@/pages/settting/Authority.vue'),
      },
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/pages/settting/UserList.vue'),
      },
    ],
  },
];

export default routes;
```

3. 在router目录下创建index.ts文件，并导入模块

   ```typescript
   import type { RouteRecordRaw } from 'vue-router';
   import { createRouter, createWebHashHistory } from 'vue-router';
   // vite2
   const routes: RouteRecordRaw[] = [];
   
   const modules = import.meta.globEager('./module/*.ts');
   for (const path in modules) {
     routes.push(...modules[path].default);
   }
   
   const router = createRouter({
     history: createWebHashHistory(),
     routes: routes,
   });
   
   export default router;
   ```

   > 这段代码的意思是获取当前module文件夹下的所有ts结尾的文件自动导入
   > ```typescript
   > const modules = import.meta.globEager('./module/*.ts');
   > for (const path in modules) {
   > 	routes.push(...modules[path].default);
   > }
   > ```
   >
   > 相当于在webpack中的这段代码
   >
   > ```typescript
   > // 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
   > const importFn = require.context('./module/', false, /\.ts$/)
   > importFn.keys().forEach(key => {
   >     const rt = importFn(key).default
   >     routes.push(rt);
   > })
   > ```

#### 集成vuex

1. 安装

`npm install vuex@next --save`

2. 创建store/index.ts文件

```typescript
// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations: {
    setCount(state: State, count: number) {
      state.count = count;
    }
  },
  getters: {
    getCount(state: State) {
      return state.count
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
```

3. 在main.ts中导入

`import { store, key } from './store/index'`

`app.use(store, key)`

> 推荐使用pinia，不再使用vuex

#### 使用sass

1. 安装

`npm install -D sass`

2. 配置公共变量 

在vite.config.js文件中添加

```javascript
css:{
	 preprocessorOptions: {
      scss: {
        additionalData: `@import "style/_style.scss";`
      }
    }
} 
```

#### 集成element plus

1. 安装步骤按官网来即可，推荐使用自动导入

2. api式的组件（如ElMessage ）使用，需要手动导入样式`import 'element-plus/es/components/message/style/css'`

   也可以通过vite 插件配置自动导入

   ```typescript
   // 1. 先安装npm i vite-plugin-style-import@1.4.1 -D
   // 这里是安装的1.4.1，最新的2.0.0按github上的redme安装报错，不知道怎么解决，所以用回1.4.1的方式
   // vite.config.ts
   
   import styleImport from 'vite-plugin-style-import'
   
   plugins: [
   	// ……
       styleImport({
         libs: [
           {
             libraryName: 'element-plus',
             esModule: true,
             resolveStyle: (name) => {
               console.log(name)
               name = name.slice(3)
               return `element-plus/es/components/${name}/style/css`
             }
           }
         ]
       })
     ],
   
   ```

3. 全局样式的修改

   ele+ 现在使用的是自定义属性的方式设置样式的，经过实际操作像原来那样在调试时复制类名修改样式的方式不太有效，直接写自己通过类选择器设置效果还好些；如果要设置主题色，直接新建一个scss文件，然后在App.vue中或index.html中引入

   ```scss
   // 用来覆盖element plus 默认值
   
   :root {
     --el-color-primary   : #15ae6d;
     //   $--color-success: #67c23a !default;
     // $--color-warning: #e6a23c !default;
     // $--color-danger: #f56c6c !default;
     // $--color-info: #909399 !default;
   }
   ```

4. 使用图标

   先安装图标npm install @element-plus/icons-vue

   使用时要先如组件一样导入

   ```
   import { Edit, Box, ArrowRight } from '@element-plus/icons-vue'
   
   <el-button type="primary" :icon="ArrowRight">上一条</el-button>
   <el-icon :size="20">
      <box />
   </el-icon>
   ```

   

   

#### 集成Axios

安装`npm install axios`

创建request.ts

```typescript
import axios from 'axios';
// 里面就是定义了一些常量  NO_PERMISSION=401 ；OK_CODE=200
import { NO_PERMISSION, OK_CODE } from '@/app/keys';
import router from '@/router';
// 可以从其他文件导入的
export interface UserInfo {
  id: number;
  username: string;
  role: string;
  email: string;
  token: string;
}

const requests = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

//拦截器
requests.interceptors.request.use((config) => {
  config = config || {};
  //pinia
  try {
    const user = JSON.parse(localStorage.getItem('user') || '') as UserInfo;
    if (user.token) {
      config.headers!['Authorization'] = `Bearer ${user.token}`;
    }
  } catch (e) {}
  return config;
});

requests.interceptors.response.use(
  (resp) => {
    const { code, msg } = resp.data || {};
    if (code !== OK_CODE) {
      return Promise.reject(msg);
    }
    if (code === NO_PERMISSION) {
      router.push({ name: 'Login' }).then();
      return Promise.reject(msg);
    }
    return Promise.resolve(resp);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requests;
```

这里有用到`import.meta.env.VITE_API_URL`,这是vite提供的用于区分开发和生产环境的

在根目录创建`.env`和`.env.production`分别表示开发时变量和生产时变量

```
# .env
VITE_API_URL=http://localhost:3031

# .env.producttion
VITE_API_URL=http://localhost:1212
```



创建useHttp.ts

```typescript
import { Method } from 'axios';
import requests from '@/api/requests';

export interface HTTPConfig {
  url: string;
  method: Method;
  data?: { [key: string]: unknown };
  params?: { [key: string]: unknown };
}
const useHttp = <T>(config: HTTPConfig): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    requests({
      url: config.url,
      method: config.method,
      data: config.data || {},
      params: config.params || {},
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default useHttp;
```

编写接口文件

```typescript
import useHttp from '@/api/useHttp';
// import { BasicResp } from '@/api/types';
// BasicResp 是返回数据的外层通用的类型
export interface BasicResp<T> {
  code: number;
  data: T;
  msg: string;
}

export interface RegParams {
  username: string;
  password: string;
  email: string;
}
export const reqUserRegister = (params: RegParams) => {
  //axios http
  return useHttp<BasicResp<null>>({
    url: `/v1/user`,
    method: 'post',
  });
};

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  info: UserInfo;
  token: string;
}

export const reqUserLogin = (params: LoginParams) => {
  //axios http
  return useHttp<BasicResp<LoginData>>({
    url: `/v1/user/login`,
    method: 'post',
    data: { ...params },
  });
};
```

#### 使用中常见问题

##### props在ts中定义

```typescript
// const props = defineProps({
//   // 接收是否显示
//   title: {
//     type: String,
//     required: true
//   },
//   tableData: {
//     type: Array,
//     required: true
//   },
//   columns: {
//     type: Array,
//     required: true
//   }
// })

// 有默认值的情况
withDefaults(defineProps<{
  title?: string
  tableData?: any[]
  columns?: Column[]
}>(), {
  title: '',
  tableData: () => [],
  columns: () => []
})

```



##### emit 事件

```ts
const emits = defineEmits<{
  (e: 'add'): void
  (e: 'edit', row: any): void
  (e: 'del', row: any): void
}>()
// const emit = defineEmits(['add', 'edit', 'del']);

const del = (row: any) => {
  emits('del', row)
}
const edit = (row: any) => {
  emits('edit', row)
}
const add = () => {
  emits('add')
}

```



##### 获取图片等静态资源

`const  aa = new URL('../assets/img/menu/fxyj-hover.png', import.meta.url).href`

import windDirImg from '@/assets/img/EDA10-img.png'

Failed to construct 'URL': Invalid URL



##### 父组件获取子组件expose

子组件中的方法或变量需要给父组件用要使用defineExpose进行导出

```ts
// 子组件 BaseMap.vue 
<script lang="ts" setup>
const baseMap: Ref<Map | undefined> = ref()

defineExpose({
  baseMap
})
</script>

```

父组件通过ref引用获取

```ts
// 父组件
<template>
  <div>
    <BaseMap class="base-map" ref="baseMap"></BaseMap>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseMap from './BaseMap.vue';

const baseMap = ref(null)

let map: Map
onMounted(() => {
  if (baseMap.value) {
      // 'baseMap'是导出的变量名称
    map = baseMap.value['baseMap'] as Map
    map.on('singleclick', e => {
      const feature = map.forEachFeatureAtPixel(e.pixel, feature => feature)
      console.log(feature);
    })
  }
})

</script>

```

##### 动态组件及异步组件加载

```vue
<template>
  <div class="live-monitor-container">

    <keep-alive>
      <component :is="components.get(compName)" />
    </keep-alive>

    <div class="toggle-button">
      <el-radio v-model="radio" label="1" border @change="rChange">环境版</el-radio>
      <el-radio v-model="radio" label="2" border @change="rChange">地灾版</el-radio>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, shallowRef, ref } from 'vue'
// import LiveMonitorEvn from './LiveMonitorEvn.vue'
// import LiveMonitorGeology from './LiveMonitorGeology.vue'

// 需要加载的组件集合
const components = shallowRef(new Map<string, any>())
components.value.set(
  'LiveMonitorEvn',
  defineAsyncComponent({
    loader: () => import('./LiveMonitorEvn.vue')
  })
)
components.value.set(
  'LiveMonitorGeology',
  defineAsyncComponent(() => import('./LiveMonitorGeology.vue'))
)
// 默认加载的组件名
const compName = ref('LiveMonitorGeology')

const radio = ref('2')
const rChange = (e: any) => {
  if (e === '1') {
    compName.value = 'LiveMonitorEvn'
  } else {
    compName.value = 'LiveMonitorGeology'
  }
}

</script>
```

