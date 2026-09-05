---
title: jQuery概述
date: 2024-06-14 12:30:00
categories: [学习]
tags:
  - 笔记
  - jQuery
  - 学习
description: jQuery概述
articleGPT: 本文介绍了jQuery的基本概念、核心特性、选择器语法以及基础使用方法，帮助初学者快速入门jQuery前端开发框架。
references:
  - title: jQuery概述
    url: https://github.com/stawei/vitepress-theme-curve
---

### 一、jQuery概述
1、jQuery是一个快速、简洁的JavaScript库，其设计的宗旨是“Write Less，Do More”，即倡导写更少的代码，做更多的事情。
2、jQuery：j就是JavaScript，Query查询，jQuery意思就是查询JS。jQuery封装了JavaScript常用的功能代码，学习jQuery的本质就是学习调用这些函数（方法）。
3、jQuery的优点

-    1）轻量级。
-    2）跨浏览器兼容。
-    3）链式编程、隐式迭代。
-    4）对事件、样式、动画支持。
-    5）支持插件扩展开发，有丰富的第三方插件。
-    6）免费、开源。
### 二、jQuery的下载
【官方地址：[https://jquery.com/](https://jquery.com/)】
### 三、jQuery的基本使用
######  1、jQuery的引入：
```javascript
<script src="jquery文件路径"></script>
```
###### 2、jQuery的入口函数（书本229页）
推荐写法：
```javascript
$(function(){   
  ……
});
```
1）`$`是jQuery的别称，上述入口函数中所有的$均可以用jQuery代替。
2）`$`同时也是jQuery的顶级对象。
###### 3、jQuery对象和DOM对象

1. 用原生js方法获取来的元素就是DOM对象。
2. 用jQuery方法获取来的元素就是jQuery对象。
3. jQuery对象只能使用jQuery方法；DOM对象则只能使用原生的JS属性和方法。
4. jQuery对象和DOM对象的相互转换（书本232页）
- DOM对象转换为jQuery对象：`$(DOM对象);`
- jQuery对象转换为DOM对象：`$('button')[index];` 或者 `$('button').get(index);`
### 四、jQuery获取元素
######  1、语法：
```javascript
$('选择器');
```
######  2、jQuery选择器：
书本233-247页 表7-1、7-2、7-3、7-4、7-5、7-6、7-7

| 名称 | 用法 | 描述 |
| --- | --- | --- |
| 标签选择器 | $('div') | 获取指定标签名的元素 |
| 类选择器 | $('.class') | 获取指定class类名的元素 |
| ID选择器 | $('#id') | 获取指定ID名的元素 |
| 群组选择器 | $('div,p,#id') | 获取多个元素 |
| 通配符选择器 | $('*') | 获取所有元素 |
| 后代选择器 | $('ul li') | 空格，获取ul下的所有li元素，包括孙子等 |
| 子代选择器 | $('ul>li') | > 获取亲儿子层级的元素 |
| 相邻兄弟选择器 | $('E+F') | + 获取紧贴在E元素之后的F元素 |
| 普通兄弟选择器 | $('E~F') | ~ 获取E元素之后的所有兄弟元素F |

### 五、jQuery常用的方法（书本250页 表7-7）

1. 
- 父`.parent()`：父元素（最近一级的父元素 亲爸爸）
- 祖`.parents()`：**所有的**祖先元素（父和父级以上的元素）
- `.parents(['选择器'])`：加选择器筛选指定的祖先元素（比一级一级.parent()找上去更简单）
2. 子
- `.children()`：相当于子代选择器，返回所有的**直接**子元素（最近一级 亲儿子）
- `.children(['选择器'])`：加选择器筛选指定的直接子元素。
- `.find('选择器')`：相当于后代选择器，返回所有指定选择器的后代（包括儿子和孙子）
3. 兄
- `.siblings()`：返回除了自身之外的所有**同辈**元素（亲兄弟，不包括自己本身）
- `.siblings(['选择器'])`：加选择器筛选指定的同辈元素。
- `.nextAll()`、`.prevAll()`：返回当前元素之后|之前的所有同辈元素
4. 
- 第`n`个元素 `.eq(index)`：返回指定索引号的元素，索引号index从0开始。
### 六、jQuery的应用

1. jQuery设置样式：
```javascript
$('选择器').css('属性', '值');
```
2. jQuery中的排他思想
3. 隐式迭代、链式编程（书本231页）
