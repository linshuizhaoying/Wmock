# Wmock 概述

Wmock是一个简单、易用，为提高前后端开发效率的Mock平台。它是为了解决前后端交流不便，前后端没有文档规范导致开发效率低下，前端手动模拟数据繁琐，项目接口对接繁重等问题而设计在线平台系统。

# 如何使用

  首先确保环境安装
    Node >= 8.0
    Mogondb >=v3.4.9

  并后台运行 mongodb 服务 `mongod`

## 自动部署版

  clone 项目置服务器，分别于 Front 目录 与 Server目录下 运行
  
  ```
  
    npm install  或者
    yarn install
  
  ```

  安装完项目依赖后。

  切换置 Deploy 目录 执行 Node index.js
  
## 手动开发版

  clone 项目置服务器，分别于 Front 目录 与 Server目录下 运行
  
  ```
  
    npm install  或者
    yarn install
  
  ```

  安装完项目依赖后。

  再分别于 Front 目录 与 Server目录下 运行

  ```

  npm run start 或者
  yarn start

  ```

## 默认管理员
  
  系统运行时会自动检查是否有默认管理管理员用户，如果没有会创建账号为admin，密码为admin888的管理员账号。

  