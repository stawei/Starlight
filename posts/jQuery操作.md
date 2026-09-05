---
title: jQuery操作
date: 2024-06-14 12:32:00
categories: [学习]
tags:
  - 笔记
  - jQuery
  - 学习
description: jQuery操作
articleGPT: 本文详细介绍了jQuery的样式操作、DOM操作、事件处理等核心功能，包括CSS方法、类样式操作、元素创建与删除、属性操作等内容，适合前端开发者学习参考。
references:
  - title: jQuery操作
    url: https://github.com/stawei/vitepress-theme-curve
---

### 一、jQuery样式操作（书本255页 表7-11）
 1、操作CSS的方法

1. 获取样式：`**元素.css(‘属性名’);**`
2. 设置样式：`**元素.css(‘属性名’,’值’);**`
3. 设置多组样式：`**元素.css({对象});**`（不推荐）

 2、操作类样式的方法

1. 添加类：`**.addClass('类名')**`
2. 移除类：`**.removeClass('类名')**`
3. 切换类：`**.toggleClass('类名')**`

3、案例应用：DOM中的选项卡切换例子
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      body,
      ul,
      li {
        margin: 0;
        padding: 0;
      }

      body {
        font: 12px/1.5 Tahoma;
      }

      #outer {
        width: 450px;
        margin: 10px auto;
      }

      #tab {
        overflow: hidden;
        zoom: 1;
        background: #000;
        border: 1px solid #000;
      }

      #tab li {
        float: left;
        color: #fff;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        list-style-type: none;
        padding: 0 20px;
      }

      #tab li.current {
        color: #000;
        background: #ccc;
      }

      #content {
        border: 1px solid #000;
        border-top-width: 0;
      }

      #content ul {
        line-height: 25px;
        display: none;
        margin: 0 30px;
        padding: 10px 0;
      }
    </style>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
  </head>
  <body>
    <div id="outer">
      <ul id="tab">
        <li class="current">第一课</li>
        <li>第二课</li>
        <li>第三课</li>
      </ul>
      <div id="content">
        <ul style="display:block;">
          <li>网页特效原理分析</li>
          <li>响应用户操作</li>
          <li>提示框效果</li>
          <li>事件驱动</li>
          <li>元素属性操作</li>
          <li>动手编写第一个JS特效</li>
          <li>引入函数</li>
          <li>网页换肤效果</li>
          <li>展开/收缩播放列表效果</li>
        </ul>
        <ul>
          <li>改变网页背景颜色</li>
          <li>函数传参</li>
          <li>高重用性函数的编写</li>
          <li>126邮箱全选效果</li>
          <li>循环及遍历操作</li>
          <li>调试器的简单使用</li>
          <li>典型循环的构成</li>
          <li>for循环配合if判断</li>
          <li>className的使用</li>
          <li>innerHTML的使用</li>
          <li>戛纳印象效果</li>
          <li>数组</li>
          <li>字符串连接</li>
        </ul>
        <ul>
          <li>JavaScript组成：ECMAScript、DOM、BOM，JavaScript兼容性来源</li>
          <li>JavaScript出现的位置、优缺点</li>
          <li>变量、类型、typeof、数据类型转换、变量作用域</li>
          <li>闭包：什么是闭包、简单应用、闭包缺点</li>
          <li>运算符：算术、赋值、关系、逻辑、其他运算符</li>
          <li>程序流程控制：判断、循环、跳出</li>
          <li>命名规范：命名规范及必要性、匈牙利命名法</li>
          <li>函数详解：函数构成、调用、事件、传参数、可变参、返回值</li>
          <li>定时器的使用：setInterval、setTimeout</li>
          <li>定时器应用：站长站导航效果</li>
          <li>定时器应用：自动播放的选项卡</li>
          <li>定时器应用：数码时钟</li>
          <li>程序调试方法</li>
        </ul>
      </div>
    </div>
    <script>
      // var tabLi = document.getElementById('tab').querySelectorAll('li');
      // var contentUl = document.getElementById('content').querySelectorAll('ul');
      // for (var i = 0; i < tabLi.length; i++) {
      // 	tabLi[i].index = i;
      // 	tabLi[i].onclick = function() {
      // 		for (var j = 0; j < tabLi.length; j++) {
      // 			tabLi[j].className = '';
      // 		}
      // 		this.className = 'current';

      // 		for (var k = 0; k < contentUl.length; k++) {
      // 			contentUl[k].style.display = '';
      // 		}
      // 		contentUl[this.index].style.display = 'block';
      // 	}
      // }

      $(function() {
        $('#tab li').click(function() {
          // 1.链式编程，上部里面的当前li添加current类，其余兄弟移除类
          $(this).addClass('current').siblings().removeClass('current');
          // 点击的同时，得到当前li的索引号
          var index = $(this).index();
          // 2.链式编程，让下部里面相应索引号的ul显示，其余的ul隐藏
          $('#content ul').eq(index).show().siblings().hide();
        })
      })
    </script>
  </body>
</html>
```
可以复制上面代码在[W3Schools 在线代码编辑器](https://www.w3ccoo.com/tryit/tryit.asp?)上运行查看效果
### 二、jQuery属性操作（书本254页 表7-9）
 1、获取或设置元素的固有属性值`**.prop()**`
  1）获取属性：`**元素.prop(‘属性名’);**`
  2）设置属性：`**元素.prop(‘属性名’, ’值’);**`
  3）移除属性值：`**元素.prop(‘属性名’, ’ ’);**`   //只是清空属性值，属性名仍在
2、获取或设置元素的自定义属性值`**.attr()**`
  1）获取属性：`**元素.attr(‘属性名’); **`
2）设置属性：`**元素.attr(‘属性名’, ’值’);** `
  3）移除属性：`**元素.removeAttr(‘属性名’);**`  //连属性名一起移除了
  4）注：`.attr()`也可用于元素的固有属性，但一般都用在自定义属性中。
3、案例应用：购物车——全选、选中商品添加背景色
### 三、jQuery内容文本操作（书本255页 表7-10）
1、普通元素内容html()、text() 
  1）获取元素的内容：`**元素.html();** ` `**元素.text();**`
  2）设置元素的内容：`**元素.html(’内容’);** ``**元素.text (’文本内容’);**`
2、表单的值val()
  1）获取表单的值：`**元素.val();** `
  2）设置表单的值：`**元素.val(’内容’);** `
3、案例应用：购物车——增减商品数量、修改商品小计（源码同案例5）
### 四、jQuery遍历元素
 1、jQuery隐式迭代是对同一类元素做了同样的操作。如果想要给同一类元素做不同的操作，就需要用到遍历元素each方法（书本250页 表7-8）
 2、语法1：
```javascript
元素.each(function(index, element){……}) 
```
      语法2：
```javascript
$.each(object, function(index, element){……})
```
 3、案例应用：购物车——计算总计、总额
五、jQuery元素操作（书本257页 表7-13）
 1、元素创建：`**$(‘元素标签’);**`
 2、元素赋值：`**元素.html(’内容’);**``**元素.text (’内容’);**``**元素.val(’内容’);**`
**    **注：固定文本也可以在创建的同时就赋值，例如`$('<li>'hello'</li>');`
3、元素添加
1）内部添加
① 放入匹配元素内部的最后面**：**`**父元素.append(‘内容’); **`
② 放入匹配元素内部的最前面**：**`**父元素.prepend(‘内容’);** `
③ 内部添加元素，生成之后，它们是父子关系。
  2）外部添加
     ① 放入目标元素的后面：`**目标元素.after(‘内容’);** `
     ② 放入目标元素的前面：`**目标元素.before(‘内容’);** `
③ 外部添加元素，生成之后，它们是兄弟关系。
 4、元素删除
  1）删除匹配的元素本身：`**元素.remove();**`    //自杀式删除
  2）删除匹配的元素集合中所有的子节点：`**元素.empty();**`   //删除孩子
### 5、案例应用：购物车——删除商品
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>我的购物车-品优购</title>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/car.css">

    <!-- 引入jquery  -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <!-- 引入我们自己的js文件 -->
    <script src="js/shopping-car.js"></script>
  </head>

  <body>
    <div class="car-header">
      <div class="w">
        <div class="car-logo">
          <img src="img/logo.png" alt=""> <b>购物车</b>
        </div>
      </div>
    </div>

    <div class="c-container">
      <div class="w">
        <div class="cart-filter-bar">
          <em>全部商品</em>
        </div>
        <!-- 购物车主要核心区域 -->
        <div class="cart-warp">
          <!-- 头部全选模块 -->
          <div class="cart-thead">
            <div class="t-checkbox">
              <input type="checkbox" name="" id="" class="checkall"> 全选
            </div>
            <div class="t-goods">商品</div>
            <div class="t-price">单价</div>
            <div class="t-num">数量</div>
            <div class="t-sum">小计</div>
            <div class="t-action">操作</div>
          </div>
          <!-- 商品详细模块 -->
          <div class="cart-item-list">
            <div class="cart-item check-cart-item">
              <div class="p-checkbox">
                <input type="checkbox" name="" id="" checked class="j-checkbox">
              </div>
              <div class="p-goods">
                <div class="p-img">
                  <img src="img/p1.jpg" alt="">
                </div>
                <div class="p-msg">【5本26.8元】经典儿童文学彩图青少版八十天环游地球中学生语文教学大纲</div>
              </div>
              <div class="p-price">￥12.60</div>
              <div class="p-num">
                <div class="quantity-form">
                  <a href="javascript:;" class="decrement">-</a>
                  <input type="text" class="itxt" value="1">
                  <a href="javascript:;" class="increment">+</a>
                </div>
              </div>
              <div class="p-sum">￥12.60</div>
              <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
            <div class="cart-item">
              <div class="p-checkbox">
                <input type="checkbox" name="" id="" class="j-checkbox">
              </div>
              <div class="p-goods">
                <div class="p-img">
                  <img src="img/p2.jpg" alt="">
                </div>
                <div class="p-msg">【2000张贴纸】贴纸书 3-6岁 贴画儿童 贴画书全套12册 贴画 贴纸儿童 汽</div>
              </div>
              <div class="p-price">￥24.80</div>
              <div class="p-num">
                <div class="quantity-form">
                  <a href="javascript:;" class="decrement">-</a>
                  <input type="text" class="itxt" value="1">
                  <a href="javascript:;" class="increment">+</a>
                </div>
              </div>
              <div class="p-sum">￥24.80</div>
              <div class="p-action"><a href="javascript:;">删除</a></div>
            </div>
            <div class="cart-item">
              <div class="p-checkbox">
                <input type="checkbox" name="" id="" class="j-checkbox">
              </div>
              <div class="p-goods">
                <div class="p-img">
                  <img src="img/p3.jpg" alt="">
                </div>
                <div class="p-msg">唐诗三百首+成语故事全2册 一年级课外书 精装注音儿童版 小学生二三年级课外阅读书籍</div>
              </div>
              <div class="p-price">￥29.80</div>
							<div class="p-num">
								<div class="quantity-form">
									<a href="javascript:;" class="decrement">-</a>
									<input type="text" class="itxt" value="1">
									<a href="javascript:;" class="increment">+</a>
								</div>
							</div>
							<div class="p-sum">￥29.80</div>
							<div class="p-action"><a href="javascript:;">删除</a></div>
						</div>
					</div>

					<!-- 结算模块 -->
					<div class="cart-floatbar">
						<div class="select-all">
							<input type="checkbox" name="" id="" class="checkall">全选
						</div>
						<div class="operation">
							<a href="javascript:;" class="remove-batch"> 删除选中商品</a>
							<a href="javascript:;" class="clear-all">清空购物车</a>
						</div>
						<div class="toolbar-right">
							<div class="amount-sum">已经选<em>1</em>件商品</div>
							<div class="price-sum">总价： <em>￥12.60</em></div>
							<div class="btn-area">去结算</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html> 

```
以下是css代码base.css
```css
/*清除元素默认的内外边距  */
* {
  margin: 0;
  padding: 0
}
/*让所有斜体 不倾斜*/
em,
i {
  font-style: normal;
}
/*去掉列表前面的小点*/
li {
  list-style: none;
}
/*图片没有边框   去掉图片底侧的空白缝隙*/
img {
  border: 0;  /*ie6*/
  vertical-align: middle;
}
/*让button 按钮 变成小手*/
button {
  cursor: pointer;
}
/*取消链接的下划线*/
a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: #e33333;
}

button,
input {
  font-family: 'Microsoft YaHei', 'Heiti SC', tahoma, arial, 'Hiragino Sans GB', \\5B8B\4F53, sans-serif;
  /*取消轮廓线 蓝色的*/
  outline: none;
}

body {
  background-color: #fff;
  font: 12px/1.5 'Microsoft YaHei', 'Heiti SC', tahoma, arial, 'Hiragino Sans GB', \\5B8B\4F53, sans-serif;
  color: #666
}

.hide,
.none {
  display: none;
}
/*清除浮动*/
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0
}

.clearfix {
  *zoom: 1
}
```
car.css
```css
.car-header {
  padding: 20px 0;
}

.car-logo img {
  vertical-align: middle;
}

.car-logo b {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 10px;
}

.cart-filter-bar {
  font-size: 16px;
  color: #E2231A;
  font-weight: 700;
}

.cart-filter-bar em {
  padding: 5px;
  border-bottom: 1px solid #E2231A;
}

.cart-thead {
  height: 32px;
  line-height: 32px;
  margin: 5px 0 10px;
  padding: 5px 0;
  background: #f3f3f3;
  border: 1px solid #e9e9e9;
  border-top: 0;
  position: relative;
}

.cart-thead>div,
.cart-item>div {
  float: left;
}

.t-checkbox,
.p-checkbox {
  height: 18px;
  line-height: 18px;
  padding-top: 7px;
  width: 122px;
  padding-left: 11px;
}

.t-goods {
  width: 400px;
}

.t-price {
  width: 120px;
  padding-right: 40px;
  text-align: right;
}

.t-num {
  width: 150px;
  text-align: center;
}

.t-sum {
  width: 100px;
  text-align: right;
}

.t-action {
  width: 130px;
  text-align: right;
}

.cart-item {
  height: 160px;
  border-style: solid;
  border-width: 2px 1px 1px;
  border-color: #aaa #f1f1f1 #f1f1f1;
  background: #fff;
  padding-top: 14px;
  margin: 15px 0;
}

.check-cart-item {
  background: #fff4e8;
}

.p-checkbox {
  width: 50px;
}

.p-goods {
  margin-top: 8px;
  width: 565px;
}

.p-img {
  float: left;
  border: 1px solid #ccc;
  padding: 5px;
}

.p-msg {
  float: left;
  width: 210px;
  margin: 0 10px;
}

.p-price {
  width: 110px;
}

.quantity-form {
  width: 80px;
  height: 22px;
}

.p-num {
  width: 170px;
}

.decrement,
.increment {
  float: left;
  border: 1px solid #cacbcb;
  height: 18px;
  line-height: 18px;
  padding: 1px 0;
  width: 16px;
  text-align: center;
  color: #666;
  margin: 0;
  background: #fff;
  margin-left: -1px;
}

.itxt {
  float: left;
  border: 1px solid #cacbcb;
  width: 42px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  padding: 1px;
  margin: 0;
  margin-left: -1px;
  font-size: 12px;
  font-family: verdana;
  color: #333;
  -webkit-appearance: none;
}

.p-sum {
  font-weight: 700;
  width: 145px;
}


/* 结算模块 */

.cart-floatbar {
  height: 50px;
  border: 1px solid #f0f0f0;
  background: #fff;
  position: relative;
  margin-bottom: 50px;
  line-height: 50px;
}

.select-all {
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 16px 0 16px 9px;
  white-space: nowrap;
}

.select-all input {
  vertical-align: middle;
  display: inline-block;
  margin-right: 5px;
}

.operation {
  float: left;
  width: 200px;
  margin-left: 40px;
}

.clear-all {
  font-weight: 700;
  margin: 0 20px;
}

.toolbar-right {
  float: right;
}

.amount-sum {
  float: left;
}

.amount-sum em {
  font-weight: 700;
  color: #E2231A;
  padding: 0 3px;
}

.price-sum {
  float: left;
  margin: 0 15px;
}

.price-sum em {
  font-size: 16px;
  color: #E2231A;
  font-weight: 700;
}

.btn-area {
    font-weight: 700;
    width: 94px;
    height: 52px;
    line-height: 52px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    background: #e54346;
    overflow: hidden;
}
```
common.css
```css
/*公共样式*/

.fl {
  float: left;
}

.fr {
  float: right;
}


.fr .icomoon {
  font-family: 'icomoon';
  font-size: 16px;
  line-height: 26px;
}


/*版心*/

.w {
  width: 1200px;
  margin: 0 auto;
}

.style-red {
  color: #c81623;
}

.spacer {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 9px 12px 0;
}


/*顶部快捷导航*/

.shortcut {
  height: 31px;
  background-color: #f1f1f1;
  line-height: 31px;
}

.shortcut li {
  float: left;
}


/*header区域*/

.header {
  position: relative;
  height: 105px;
}

.logo {
  position: absolute;
  top: 25px;
  left: 0;
  width: 175px;
  height: 56px;
}

.logo a {
  display: block;
  /*overflow: hidden;*/
  width: 175px;
  height: 56px;
  background: url(../img/logo.png) no-repeat;
  /*text-indent: -999px;*/
  font-size: 0;
}

.search {
  position: absolute;
  top: 25px;
  left: 348px;
}

.text {
  float: left;
  width: 445px;
  height: 32px;
  border: 2px solid #b1191a;
  padding-left: 10px;
  color: #ccc;
}

.btn {
  float: left;
  width: 82px;
  height: 36px;
  background-color: #b1191a;
  border: 0;
  font-size: 16px;
  color: #fff;
}

.hotwrods {
  position: absolute;
  top: 65px;
  left: 348px;
}

.hotwrods a {
  margin: 0 10px;
}

.shopcar {
  position: absolute;
  top: 25px;
  right: 64px;
  width: 138px;
  height: 34px;
  border: 1px solid #dfdfdf;
  background-color: #f7f7f7;
  line-height: 34px;
  text-align: center;
}

.car {
  font-family: 'icomoon';
  color: #da5555;
}

.arrow {
  font-family: 'icomoon';
  margin-left: 5px;
}

.count {
  position: absolute;
  top: -5px;
  /*应该是左侧对齐 文字才能往右走显示*/
  left: 100px;
  background-color: #e60012;
  height: 14px;
  padding: 0 3px;
  line-height: 14px;
  color: #fff;
  /*border-radius: 左上角 右上角  右下角  左下角;*/
  border-radius: 7px 7px 7px 0;
}


/*nav start*/

.nav {
  height: 45px;
  border-bottom: 2px solid #b1191a;
}

.dropdown {
  width: 209px;
  height: 45px;
}

.dropdown .dt {
  height: 100%;
  background-color: #b1191a;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 45px;
}

.dropdown .dd {
  height: 465px;
  background-color: #c81623;
  margin-top: 2px;
}

.menu_item:hover {
  background-color: #fff;
}


/*鼠标经过li 里面的 a变颜色*/

.menu_item:hover a {
  color: #c81623;
}

.menu_item {
  height: 31px;
  line-height: 31px;
  margin-left: 1px;
  padding: 0 10px;
  transition: all .5s;
}

.menu_item:hover {
  padding-left: 20px;
}

.menu_item a {
  font-size: 14px;
  color: #fff;
}

.menu_item i {
  float: right;
  font-family: 'icomoon';
  font-size: 18px;
  color: #fff;
}

.navitems {
  margin-left: 10px;
}

.navitems li {
  float: left;
}

.navitems li a {
  display: block;
  height: 45px;
  padding: 0 25px;
  line-height: 45px;
  font-size: 16px;
}


/*footer 部分*/

.footer {
  height: 386px;
  background-color: #f5f5f5;
  padding-top: 30px;
}

.mod_service {
  height: 79px;
  border-bottom: 1px solid #ccc;
}

.mod_service li {
  float: left;
  width: 240px;
  height: 79px;
}

.mod-service-icon {
  /*浮动的盒子 可以直接给大小的 不需要转换*/
  float: left;
  width: 50px;
  height: 50px;
  margin-left: 35px;
  background: url(../img/icons.png) no-repeat;
}

.mod_service_zheng {
  background-position: -253px -3px;
}

.mod_service_tit {
  float: left;
  margin-left: 5px;
}

.mod_service_tit h5 {
  margin: 5px 0;
}

.mod_service_kuai {
  background-position: -255px -54px;
}

.mod_service_bao {
  background-position: -257px -105px;
}

.mod_help {
  height: 187px;
  border-bottom: 1px solid #ccc;
}

.mod_help_item {
  float: left;
  width: 150px;
  padding: 20px 0 0 50px;
}

.mod_help_item dt {
  height: 25px;
  font-size: 16px;
}

.mod_help_item dd {
  height: 22px;
}

.mod_help_app dt,
.mod_help_app p {
  padding-left: 15px;
}

.mod_help_app img {
  margin: 7px 0;
}

.mod_copyright {
  text-align: center;
}

.mod_copyright_links {
  margin: 20px 0 15px 0;
}

.mod_copyright_info {
  line-height: 18px;
}
```
以下是shopping-car.js
```javascript
$(function() {
  //全选、选中商品添加背景色
  $('.checkall').change(function() {
    $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));

    if ($(this).prop('checked') == true) {
      $('.cart-item').addClass('check-cart-item');
    } else {
      $('.cart-item').removeClass('check-cart-item');
    }
  })

  $('.j-checkbox').change(function() {
    if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
      $('.checkall').prop('checked', true);
    } else {
      $('.checkall').prop('checked', false);
    }

    if ($(this).prop('checked') == true) {
      $(this).parents('.cart-item').addClass('check-cart-item');
    } else {
      $(this).parents('.cart-item').removeClass('check-cart-item');
    }
  })

  //增减商品数量、修改商品小计
  $('.increment').click(function() {
    var n = $(this).siblings('.itxt').val();
    n++;
    $(this).siblings('.itxt').val(n);

    var price = $(this).parents('.p-num').siblings('.p-price').text().substr(1);
    var total = price * n;
    $(this).parents('.p-num').siblings('.p-sum').text('￥' + total.toFixed(2));

    getSum();
  })

  $('.decrement').click(function() {
    var n = $(this).siblings('.itxt').val();
    if (n == 1) {
      return;
    }
    n--;
    $(this).siblings('.itxt').val(n);

    var price = $(this).parents('.p-num').siblings('.p-price').text().substr(1);
    var total = price * n;
    $(this).parents('.p-num').siblings('.p-sum').text('￥' + total.toFixed(2));

    getSum();
  })

  //修改文本框的值 计算小计
  $('.itxt').change(function() {
    var price = $(this).parents('.p-num').siblings('.p-price').text().substr(1);
    var n = $(this).val();
    var total = price * n;
    $(this).parents('.p-num').siblings('.p-sum').text('￥' + total.toFixed(2));

    getSum();
  })

  //计算总计、总额
  function getSum() {
    var count = 0;
    $('.itxt').each(function() {
      count += $(this).val() - 0;
    })
    $('.amount-sum em').text(count);

    var money = 0;
    $('.p-sum').each(function() {
      money += $(this).text().substr(1) - 0;
    })
    $('.price-sum em').text('￥' + money.toFixed(2));
  }

  // 删除商品
  // (1) 商品后面的删除按钮
  $('.p-action a').click(function() {
    $(this).parents('.cart-item').remove();
    getSum();
  })

  // (2) 删除选中商品
  $('.remove-batch').click(function() {
    $('.j-checkbox:checked').parents('.cart-item').remove();
    getSum();
  })

  // (3) 清空购物车
  $('.clear-all').click(function() {
    $('.cart-item').remove();
    getSum();
  })
})
```
以上通过[菜鸟在线工具](https://www.jyshare.com/front-end/61/)可查看效果
