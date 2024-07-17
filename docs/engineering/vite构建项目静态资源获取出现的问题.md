### vite构建项目静态资源获取出现的问题

##### new URL打包后报错

在webpack中提供了require()的方法可以再在代码中获取本地文件。

在vite中与之对应的提供了`new URL('./img.png', import.meta.url).href`的方法；但在实践中，当项目打包部署后遇到了`Failed to construct 'URL': Invalid URL`URL无效的问题。

###### 可以正常使用的情况

```typescript
const icon = new URL('../assets/img/icon.png', import.meta.url).href
```

在全局这样获取静态图片，然后在方法中去使用或在模板中绑定都是没有问题的，打包后也可以正常获取到静态图片。

###### 打包后报错的情况

```typescript
const useIcon = (iconName: string) => {
  const icURL = new URL('../assets/img/'+iconName+'.png', import.meta.url).href
  // 同事试了下`../assets/img/${iconName}.png`字符串模板是可以的
  // 返回URL 或使用url
}
```

在这种情况下不打包时URL都是可以正常获取的，但打包后就会出现`Failed to construct 'URL': Invalid URL`的错误，这是因为打包后`assets`内的文件被编译成了base64或文件名进行了hash，而这个时候再通过`../assets/img/xxx.png`自然就报错了。

##### 解决new URL打包后报错

1. 通过import导入
   
   ```typescript
   import imgUrl from '@/assets/img/icon.png'
   ```
   
   导入后得到的会是一个路径字符串`./assets/img/icon.png`,打包后也会得到对应的打包后的资源路径

2. 将资源放在public目录下，使用public下的资源
   
   如果还是想通过方法接收文件名称得到文件路径，那么可以通过public目录来实现
   
   ```typescript
   const useIcon = (iconName: string) => {
     const icURL = `/img/${iconName}.png`
     // 返回URL 或使用url
   }
   ```
   
   public目录在打包时是不会改变的，所以不论是开发还是生成，都是同一个文件名称。比如使用`public/img/icon.png`直接写`/img/icon.png`就可以了，开发和生产都不会有问题.