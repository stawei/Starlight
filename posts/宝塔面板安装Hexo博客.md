---
title: 宝塔面板安装Hexo博客
date: 2024-06-02
categories: [前端开发]
tags: [技术]
description: 宝塔面板安装Hexo博客教程
articleGPT: 本文详细介绍了如何使用宝塔面板部署Hexo博客，包括安装nodejs、创建网站目录、安装Hexo、初始化项目、安装主题等步骤
references:
  - title: Hexo
    url: https://hexo.io/
---

### Hexo是一个使用nodejs 编写的博客类型的网站，本篇教程就是如何使用面板部署Hexo

1、安装nodejs，我这里选择的是稳定版V20.13.1
![2024-05-26140959.png](https://cdn.nlark.com/yuque/0/2024/png/29368235/1718075272118-a86c1232-2bcb-48ed-8e7a-a514de5be027.png)
2、在网站目录创建网站目录hexo
在/www/wwwroot/文件夹下创建hexo文件夹
3、创建完成后，使用npm安装（在hexo文件夹下运行）

```bash
$ npm install hexo -g
```

4、设置hexo的环境变量（注意与node.js版本对于）

```bash
$ ln -s /www/server/nodejs/v20.13.1/lib/node_modules/hexo/bin/hexo /usr/bin/hexo
```

5、安装好后，进行初始化

```bash
$ hexo init
```

6、生成静态文件

```bash
$ hexo generate
```

或者是

```bash
$ hexo g
```

7、新建网站
![2024-05-26193150.png](https://cdn.nlark.com/yuque/0/2024/png/29368235/1718075300350-36609424-9e02-4d99-a07c-6d1facff890b.png#averageHue=%23fdfdfd&clientId=u648e44ca-36ee-4&from=paste&height=638&id=u84e610d0&originHeight=1275&originWidth=1573&originalType=binary&ratio=2&rotation=0&showTitle=false&size=69927&status=done&style=none&taskId=u7c3403c6-75a1-4413-b886-7ec55ab266b&title=&width=786.5)
8、设置网站运行目录
![2024-05-26192939.png](https://cdn.nlark.com/yuque/0/2024/png/29368235/1718075306507-84033593-620a-422d-bf54-f209ffc717db.png#averageHue=%23fbfbfb&clientId=u648e44ca-36ee-4&from=paste&height=431&id=u3cf9383e&originHeight=862&originWidth=1589&originalType=binary&ratio=2&rotation=0&showTitle=false&size=118949&status=done&style=none&taskId=uce5e9056-bf4a-4d0e-8c51-64b6ac88452&title=&width=794.5)
9、然后就可以访问网站啦
