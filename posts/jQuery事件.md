---
title: jQuery事件
date: 2024-06-20 14:13:03
categories: [学习]
tags:
  - 笔记
  - jQuery
  - 学习
description: jQuery事件处理与事件绑定机制详解
articleGPT: 本文详细介绍了jQuery中的事件处理机制，包括单个事件绑定、on()方法绑定多个事件、事件解绑以及事件委托等核心概念，帮助读者掌握jQuery事件编程的基础知识。
references:
  - title: jQuery事件
    url: https://github.com/stawei/vitepress-theme-curve
---

### 一、jQuery事件处理
1. 单个事件绑定：

语法：`**元素.事件名(function() { 事件处理程序})**`**    **//此方法只能绑定单个事件

2. 事件处理on()绑定事件：绑定一个或多个事件的事件处理函数。
- 一个事件：

n  语法：
```javascript
元素.on(‘事件名’, function() { 事件处理程序 })
```

- 多个事件一个事件处理程序，多个事件名之间用空格分隔

n  语法：
```javascript
元素.on(‘事件名1  事件名2……’, function() { 事件处理程序 })
```

- 多个事件多个事件处理程序，以对象形式绑定多个事件

n  语法：
```javascript
元素.on({ 
事件名1: function() { 事件处理程序1  },  //事件名与回调函数冒号分隔
事件名2: function() { 事件处理程序2  }, 
……    //多组之间用逗号分隔，最后一组的逗号可以省略
})
```

3. 事件处理`one()`绑定事件
- `one()`只能触发事件一次，之后将自动取消绑定（书本264页）
- 注意：若换成`on()`方法，则点击一次，事件触发一次。
4. 解绑事件：`off()`方法
- 解绑元素所有事件处理程序：`**元素.off();**`
- 解绑元素上面的某个事件：`**元素.off(‘事件名’);**`
### 二、复合事件（书本266页）

1. hover(移入事件, 移出事件)
- 移入事件：鼠标移到元素上要触发的函数（相当于`.mouseenter()`）
- 移出事件：鼠标移出元素要触发的函数（相当于`.mouseleave()`）
- `hover()`是结合`.mouseenter()`和`.mouseleave()`，并非`.mouseover()`和`.mouseout()`。
2. 注：如果只写一个函数，则鼠标移入和移出都会触发这个函数。
### 三、案例应用：DOM中的简易留言板例子
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      li {
        background-color: yellow;
        width: 300px;
        margin: 10px;
        padding: 5px;
      }

      li a {
        float: right;
      }
    </style>
  </head>
  <body>
    <textarea cols="30" rows="10"></textarea>
    <button id="bt">发布</button>
    <ul>
      <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    </ul>
    <script>
      // var btn = document.getElementById('bt');
      // var text = document.querySelector('textarea');
      // var uu = document.querySelector('ul');

      // btn.onclick = function() {
      // 	// 1、发布留言
      // 	var newLi = document.createElement('li');
      // 	newLi.innerHTML = text.value + '<a href="javascript:;">删除</a>';
      // 	uu.insertBefore(newLi, uu.children[0]);

      // 	// 2、删除留言
      // 	var dels = document.querySelectorAll('a');
      // 	for (var i = 0; i < dels.length; i++) {
      // 		dels[i].onclick = function() {
      // 			uu.removeChild(this.parentNode);
      // 		}
      // 	}
      // }

      $(function() {
        $('button').on('click', function() {
          // 1、发布留言
          var li = $('<li></li>');
          li.html($('textarea').val() + '<a href="javascript:;">删除</a>');
          $('ul').prepend(li);

          // // 2、删除留言
          //因发布留言中动态创建的li(a)在此click事件之前，所以此方法可以
          // $('a').on('click', function() {
          // 	$(this).parent().remove();
          // })

          //若将发布留言的代码放在删除留言代码的后面，或者放在button按钮事件的外面
          //即动态创建的li(a)在此click事件之后创建，就一定要用事件委托
          $('ul').on('click', 'a', function() {
            $(this).parent().remove();
          }) //此处的this指的是实际触发对象a
        })
      })
    </script>
  </body>
</html>
```
可以复制上面代码在[W3Schools 在线代码编辑器](https://www.w3ccoo.com/tryit/tryit.asp?)上运行查看效果
