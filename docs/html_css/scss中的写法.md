---
outline: deep
---

# scss 中的一些写法

## 父选择器&

&代表了父选择器的名字，字符串拼接也支持

```scss
a {
  color: #333;
}
a:hover {
  color: red;
}

// 改进
a {
  color: #333;
  &:hover {
    color: red;
  }
}
```

## 属性嵌套

```scss
.container a {
  color: #333;
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
}

// 改进
.container a {
  color: #333;
  font: {
    size: 14px;
    family: 'Courier New', Courier, monospace;
    weight: bold;
  }
}
```

## 占位符（继承）

```scss
.btn%base {
  display: inline;
  text-align: center;
  user-select: none;
}
.btn-default {
  @extend %base;
  color: #333;
  background-color: #fff;
}
.btn-success {
  @extend %base;
  color: #fff;
  background-color: greenyellow;
}
// 编译后的结果 相当于继承了公共样式
.btn.btn-default,
.btn.btn-success {
  display: inline;
  text-align: center;
  user-select: none;
}

.btn-default {
  color: #333;
  background-color: #fff;
}
.btn-success {
  color: #fff;
  background-color: greenyellow;
}
```

## 变量

```scss
// css3全局变量
:root {
  --color: skyblue;
}

// 仅这个选择器内部可用
body {
  --border-color: #f2f2f2;
}

p {
  color: var(--color);
  border-color: var(--border-color);
}

// scss中 定义在外部是全局变量，在选择器内部是局部变量
$color-primary: red;
.p {
  color: $color-primary;
}
```

## 导入

```scss
// css3
@import url(文件名);
// scss
@import '文件名';
```

## 子组合选择器和同层组合选择器：>、+和~

```scss
article > section {
  border: 1px solid #ccc;
}
// > 表示选中直接子类
```

```scss
header + p {
  font-size: 1.1em;
}
// + 同层相邻组合选择器+选择header元素后紧跟的p元素
```

```scss
header ~ p {
  font-size: 1.1em;
}
// ~ 同层全体组合选择器+选择header元素后所有的p元素
```
