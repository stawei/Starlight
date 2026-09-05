---
# 文章基础元数据
title: Starlight 主题                  # 文章标题
date: 2023-12-31 23:59:59             # 创建时间：2023年12月最后一天
categories: [文档]                    # 文章分类
tags: [Starlight, 主题, 教程]         # 文章标签
description: Starlight 主题使用文档，包含 YAML 元数据说明和快速入门指南
---


# 欢迎来到 Starlight 主题
🎉 你好啊，很高兴你选择了 [Starlight](https://github.com/stawei/vitepress-theme-curve) ！这将是你的第一篇文章，你可以查看 [主题文档](https://github.com/stawei/vitepress-theme-curve) 以了解更多，如果你在使用本主题时遇到问题，你可以在 [GitHub](https://github.com/stawei/vitepress-theme-curve) 中正确提交 [issues](https://github.com/stawei/vitepress-theme-curve/issues) 以获取社区的帮助。

::: info 若您有修改主题的需求，请确保您拥有基础的前端知识，最好能掌握 [Vue.js](https://vuejs.org/) 框架的相关知识，并确保阅读了 `VitePress` 的 [官方文档](https://vitepress.dev/zh/guide/what-is-vitepress):::

## 一、Hello 入门
这是你在 Starlight 主题里创建的第一篇文章，从这里开始，你可以完全按照自己的想法搭建个人博客、技术笔记站或者内容分享站点。主题已经帮你预置好了基础的页面样式、文章布局和交互效果，不需要从零开始写大量重复代码。

你只需要专注于内容创作，剩下的排版、展示和基础优化，Starlight 都会自动帮你完成。

## 二、快速开始
### 书写新的文章
你可以直接在站点根目录中的 `posts` 文件夹中直接新建 `markdown` 文件来书写，你的文件路径即为实际生成的网址路径，不需要额外手动配置路由。

### 添加新的页面
你可以直接在站点根目录中的 `pages` 文件夹中直接新建 `markdown` 文件来实现新建页面，文件路径会自动映射为站点的访问路径。主题中已经内置了几个常用页面作为参考，你可以直接修改或者新增。

### 主题配置
本主题提供了一个 `themeConfig.mjs` 文件用来配置，它位于 `.vitepress\theme\assets\themeConfig.mjs`，你可以将它复制一份并移动至根目录中，在这里面的修改将会覆盖初始配置。请注意，**请不要更改文件名或者删除原配置文件，否则它将会不起作用！**

### 静态文件
通常情况下，静态文件处于根目录下的 `public` 文件夹中，用于存放字体、图片等资源文件。了解更多：[资源处理](https://vitepress.dev/zh/guide/asset-handling#asset-handling)

## 三、快速部署
如果你之前使用过 Hexo 这类静态站点生成器，你会发现 Starlight 的部署逻辑和它非常相似：都是先构建生成纯静态文件，再上传到任意支持静态资源托管的平台即可访问。

你也可以借助 GitHub Actions 实现自动部署，提交代码后站点会自动完成构建和更新，不需要每次手动操作。

基础构建命令如下：

### 安装依赖  

```language
npm install  
```

### 构建静态文件  

```language
npm run build  
```


更推荐使用 pnpm 来管理依赖，安装和构建速度会更快：

### 全局安装 pnpm  

```language
npm install pnpm -g  
```

### 安装项目依赖  

```language
pnpm install  
```

### 构建静态文件  

```language
pnpm build  
```


默认配置下，打包后的静态文件会生成在根目录的 `.vitepress\dist` 文件夹中，你可以把这个文件夹里的全部内容上传到服务器、对象存储或者免费静态托管平台，就能直接访问你的站点了。

## 四、元数据说明
这部分是 Starlight 主题的核心配置规则，每篇文章顶部的 YAML 元数据，决定了文章的标题、链接、分类标签等核心属性，所有支持的字段说明如下：

### 基础必填元数据
| 字段 | 说明 | 示例 |
| :--- | :--- | :--- |
| `title` | 文章标题，会显示在文章列表和文章页顶部 | `title: 我的第一篇技术笔记` |
| `abbrlink` | 文章短链接，用于生成固定的唯一URL，避免路径变动导致链接失效 | `abbrlink: first-note` |
| `date` | 文章发布日期，支持精确到时分秒 | `date: 2023-12-31` 或 `date: 2023-12-31 23:59:59` |


### 分类和标签
| 字段 | 说明 | 示例 |
| :--- | :--- | :--- |
| `categories` | 文章分类，支持设置单个或多个分类 | `categories: [技术笔记, 云原生]` |
| `tags` | 文章标签，支持设置多个标签用于内容归类 | `tags: [Docker, 部署教程]` |


### 描述和摘要
| 字段 | 说明 | 示例 |
| :--- | :--- | :--- |
| `description` | 文章简介，会展示在文章列表页，也会作为页面的SEO描述使用 | `description: 本文详细讲解了Docker容器化部署的基础步骤` |
| `articleGPT` | AI摘要，会自动展示在文章页顶部，帮助读者快速了解全文内容 | `articleGPT: 这是一篇面向新手的Docker入门部署教程，覆盖环境搭建到上线全流程` |


### 其他可选配置
| 字段 | 说明 | 示例 |
| :--- | :--- | :--- |
| `cover` | 文章封面图片URL，不填写则自动使用主题配置的默认封面 | `cover: https://example.com/cover.jpg` |
| `top` | 设置文章是否在列表页置顶展示 | `top: true` |
| `aside` | 控制当前文章是否显示侧边栏，默认开启 | `aside: false` |
| `copyright` | 控制当前文章是否显示底部版权声明，默认开启 | `copyright: false` |
| `password` | 给当前文章设置访问密码，设置后需要输入正确密码才能查看内容 | `password: 123456` |
| `references` | 文章底部的参考资料链接列表，支持添加多个参考链接 | 格式示例见下方 |


参考资料配置格式示例：

`references:  
- title: VitePress 官方文档  
url: https://vitepress.dev/  
- title: Docker 官方教程  
url: https://docs.docker.com/  
`

## 更多信息
更多主题使用细节请参考官方文档：[Starlight 主题文档](https://github.com/stawei/)
