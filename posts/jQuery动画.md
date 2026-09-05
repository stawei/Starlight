---
title: jQuery动画
date: 2024-06-20 14:13:12
categories: [学习]
tags: [笔记, jQuery, 学习]
description: jQuery动画基础教程，包含显示隐藏、淡入淡出、滑动、自定义动画等效果
articleGPT: 这是一篇关于jQuery动画的详细教程，介绍了显示隐藏、淡入淡出、滑动、自定义动画等多种动画效果的使用方法和参数说明
references:
  - title: jQuery动画
    url: https://github.com/stawei/vitepress-theme-curve
---

### 一、显示隐藏
1、显示：
```javascript
show ( [speed], [easing], [fn] );
```
2、隐藏：
```javascript
hide ( [speed], [easing], [fn] );
```
3、显示隐藏切换：
```javascript
toggle ( [speed], [easing], [fn] );
```
4、参数说明（[jQuery手册](http://hemin.cn/jq/)：[w3手册](https://www.w3school.com.cn/jquery/jquery_reference.asp)）
1）`speed`：三种预定速度之一（`slow`，`normal`，`fast`）或者表示动画时长的毫秒数值。
2）`easing`：用来指定切换效果，默认是swing（慢快慢），可用参数linear（匀速）。
3）`fn`：回调函数，在动画完成时执行的函数，每个元素执行一次。
4）参数都可以省略，则无动画直接显示隐藏。
5、案例应用：淘宝服饰
```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
      * {
        margin: 0;
        padding: 0;
        font-size: 12px;
      }

      ul {
        list-style: none;
      }

      a {
        text-decoration: none;
      }

      .wrapper {
        width: 250px;
        height: 248px;
        margin: 100px auto 0;
        border: 1px solid pink;
        border-right: 0;
        overflow: hidden;
      }

      #left,
      #content {
        float: left;
      }

      #left li a {
        display: block;
        width: 48px;
        height: 27px;
        border-bottom: 1px solid pink;
        line-height: 27px;
        text-align: center;
        color: black;
      }

      #left li a:hover {
        background-image: url(img/ktlx1/abg.gif);
      }

      #content {
        border-left: 1px solid pink;
        border-right: 1px solid pink;
      }
    </style>

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script>
      $(function() {
        $('ul li').mouseover(function() {
          var i = $(this).index();
          $('#content div').eq(i).show().siblings().hide();
        })
      })
    </script>
  </head>

  <body>
    <div class="wrapper">
      <ul id="left">
        <li><a href="#">连衣裙</a></li>
        <li><a href="#">毛衣</a></li>
        <li><a href="#">呢大衣</a></li>
        <li><a href="#">羽绒服</a></li>
        <li><a href="#">围巾</a></li>
        <li><a href="#">包包</a></li>
        <li><a href="#">女靴</a></li>
        <li><a href="#">雪地靴</a></li>
        <li><a href="#">牛仔裤</a></li>
      </ul>
      <div id="content">
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i2/113872824/O1CN01gj83dP1WjRRix3pgv_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i2/855590141/O1CN01B5k06Q1Cuco9KmO8Q_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i3/11542210/O1CN016Fo5d11SCDtcU6yKP_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i2/3354259449/O1CN01sN8U952JfhD9esfKv_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i1/28068310/O1CN01IIZj0C2BG283kzOuI_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i1/124913381/O1CN01gxu5t61aqY1b0HhZb_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i1/111608559/O1CN01mnefpP2D64s8iQXta_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i4/4481614776/O1CN01OUPkE91l9SWckDq86_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
        <div>
          <a href="#"><img src="https://img.alicdn.com/imgextra/i1/6594444769/O1CN01SHmHyU1l6FnqBREXN_!!0-saturn_solar.jpg_360x360xzq75.jpg_.webp" width="200" height="250" /></a>
        </div>
      </div>
    </div>
  </body>
</html>
```
### 二、滑动
1、下滑：
```javascript
slideDown ( [speed], [easing], [fn] );   //参数同上
```
2、上滑：
```javascript
slideUp ( [speed], [easing], [fn] );   //参数同上
```
3、滑动切换：
```javascript
slideToggle ( [speed], [easing], [fn] );   //参数同上
```
4、案例应用：滑动下拉菜单
5、动画队列
1）动画或效果一旦触发就会执行，若多次触发，就造成多个动画或效果排队执行。
2）停止排队：stop()  //停止动画或效果（写到动画或效果的前面，相当于停止结束上一次动画）
```html
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document</title>
		<style>
			* {
				margin: 0;
				padding: 0;
			}

			li {
				list-style-type: none;
			}

			a {
				text-decoration: none;
				font-size: 14px;
			}

			.nav {
				margin: 20px;
			}

			.nav>li {
				position: relative;
				float: left;
				width: 80px;
				height: 41px;
				text-align: center;
			}

			.nav li a {
				display: block;
				width: 100%;
				height: 100%;
				line-height: 41px;
				color: #333;
			}

			.nav>li>a:hover {
				background-color: orange;
			}

			.nav ul {
				display: none;
				position: absolute;
				top: 41px;
				left: 0;
				width: 78px;
				border-left: 1px solid #FECC5B;
				border-right: 1px solid #FECC5B;
				border-top: 1px solid #FECC5B;
			}

			.nav ul li {
				border-bottom: 1px solid #FECC5B;
			}

			.nav ul li a:hover {
				background-color: #FFF5DA;
			}
		</style>

		<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
		<script>
			$(function() {
				$('.nav>li').hover(function() {
					$(this).children('ul').stop().slideToggle();
				})
			})
		</script>
	</head>

	<body>
		<ul class="nav">
			<li>
				<a href="#">网站首页</a>
			</li>
			<li>
				<a href="#">专业建设</a>
				<ul>
					<li>
						<a href="">建设目标</a>
					</li>
					<li>
						<a href="">建设思路</a>
					</li>
					<li>
						<a href="">培养方案</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#">师资队伍</a>
				<ul>
					<li>
						<a href="">负责人</a>
					</li>
					<li>
						<a href="">队伍结构</a>
					</li>
					<li>
						<a href="">任课教师</a>
					</li>
					<li>
						<a href="">教学管理</a>
					</li>
					<li>
						<a href="">合作办学</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#">教学条件</a>
				<ul>
					<li>
						<a href="">经费投入</a>
					</li>
					<li>
						<a href="">实践教学</a>
					</li>
					<li>
						<a href="">教学改革</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="#">改革建设</a>
				<ul>
					<li>
						<a href="">课程改革</a>
					</li>
					<li>
						<a href="">教材改革</a>
					</li>
				</ul>
			</li>
		</ul>
	</body>
</html>
```
可以复制上面代码在[W3Schools 在线代码编辑器](https://www.w3ccoo.com/tryit/tryit.asp?)上运行查看效果
### 三、淡入淡出
1、淡入：
```javascript
fadeIn ( [speed], [easing], [fn] );   //参数同上
```
2、淡出：
```javascript
fadeOut ( [speed], [easing], [fn] );   //参数同上
```
3、淡入淡出切换：
```javascript
fadeToggle ( [speed], [easing], [fn] );   //参数同上
```
4、渐进方式调整到指定的不透明度：
```javascript
fadeTo ( speed, opacity, [easing], [fn] );
```
注：opacity透明度必须写，取值0~1；修改透明度时speed也必须写；其余参数同上。
5、案例应用：高亮显示
```html
<!DOCTYPE html>
<html>

  <head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      ul {
        list-style: none;
      }

      body {
        background: #000;
      }

      .wrap {
        margin: 50px auto 0;
        width: 570px;
        height: 530px;
        padding: 10px 0 0 10px;
        background: #000;
        overflow: hidden;
        border: 1px solid #fff;
      }

      .wrap li {
        float: left;
        margin: 0 10px 10px 0;
      }

      .wrap img {
        display: block;
        border: 0;
        width: 180px;
        height: 254px;
      }
    </style>

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script>
      $(function() {
        $('ul li').hover(function() {
          $(this).siblings().stop().fadeTo(300, 0.3);
        }, function() {
          $(this).siblings().stop().fadeTo(300, 1);
        })
      })
    </script>
  </head>

  <body>
    <div class="wrap">
      <ul>
        <li>
          <a href="#"><img src="https://cdn.pixabay.com/photo/2013/07/13/13/46/playing-card-161495_1280.png" alt="" /></a>
        </li>
        <li>
          <a href="#"><img src="https://cdn.pixabay.com/photo/2013/07/13/13/46/playing-card-161491_1280.png" alt="" /></a>
        </li>
        <li>
          <a href="#"><img src="https://cdn.pixabay.com/photo/2012/04/11/13/39/ace-28278_1280.png" alt="" /></a>
        </li>
        <li>
          <a href="#"><img src="https://cdn.pixabay.com/photo/2012/04/11/14/06/joker-28361_1280.png" alt="" /></a>
        </li>
        <li>
          <a href="#"><img src="https://cdn.pixabay.com/photo/2012/04/11/13/38/four-28272_1280.png" alt="" /></a>
        </li>
        <li>
          <a href="#"><img src="https://cdn.pixabay.com/photo/2012/04/11/13/42/six-28287_1280.png" alt="" /></a>
        </li>
      </ul>
    </div>
  </body>
</html>
```
可以复制上面代码在[W3Schools 在线代码编辑器](https://www.w3ccoo.com/tryit/tryit.asp?)上运行查看效果
### 四、自定义动画animate
1、语法：
```javascript
animate ( params, [speed], [easing], [fn] );
```
注：params表示想要更改的样式属性，必须写，以对象形式传递；其余参数同上。
2、案例应用：手风琴效果
```javascript
$(function() {
  // 鼠标经过某个li 有两步操作：
  $('li').mouseover(function() {
    // 1、当前li宽度变为 224px，同时里面的小图片淡出，大图片淡入 (用隐藏显示也可以，但效果没有淡入淡出好)
    $(this).stop().animate({
      width: '224px'
    }).find('.small').stop().fadeOut().siblings('.big').stop().fadeIn();
    // 2、其余兄弟li宽度变为69px，小图片淡入，大图片淡出
    $(this).siblings().stop().animate({
      width: '69px'
    }).find('.small').stop().fadeIn().siblings('.big').stop().fadeOut();
  })
})
```
(由于没有图床原因就没有完善了，以上是核心代码)
