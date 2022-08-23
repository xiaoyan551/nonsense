### this指向

#### 函数内this指向

谁调用指向谁，直接调用的指向window

* 普通函数、定时器、立即执行函数的this都指向window
* 构造函数、对象方法调用this指向实例对象
* 时间绑定的this指向绑定时间的对象

#### 改变函数内this的指向

###### call()

`被调用函数.call(this指向谁，参数1,参数2,……)`

* call可以调用函数，可以改变this的指向

* 我们可以用call实现继承（在子类中调用父类构造，改变父类构造中的this指向子类实例）

###### apply()

`被调用函数.apply(this指向谁，参数数组)`

* 和call基本一样，就是接受的参数是数组的形式传递，其他不变

###### bind()

`var 返回的函数 = 原函数.bind(this指向谁,参数1,参数2,……)`

* 不会调用函数，能改变this的指向
* 相当于返回一个改变this之后的原函数拷贝

### 严格模式

es5开始提供，IE10以上才会支持

* 消除js语法的一些不合理、不严谨，减少怪异行为
* 消除代码运行的不安全
* 提高编译效率，增加运行速度
* 禁用未来版本中的一些关键字，如class、enum等不能做变量名

#### 开启严格模式

1. 在script的第一行添加`'use strict'`即可
2. 在函数内部的第一行添加`'use strict'`为某个函数添加

#### 严格模式的变化

* 变量必须先声明再使用
* 不能删除已经声明的变量
* 普通函数this指向undefined
* 构造函数不能直接调用，只能new
* 定时器中的this还是window
* 函数不允许有同名的参数

### 高阶函数

函数可以作为参数传递

函数可以作为返回值返回

### 闭包

一个函数作用域访问另一个函数的局部变量

作用：延伸变量的作用域范围

```javascript
function makerPower(val){
    return function(number){
        return Math.pow(val,number)
    }
}
// 求平方
var power2 = makerPower(2)
// 求立方
var power3 = makerPower(3)
power2(10)
power3(10)

```



