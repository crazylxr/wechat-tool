## logo
哪位好心人帮我设计一个
## 官方主页
[官网](https://github.com/crazylxr/wechat-tool)

## 介绍
一个基于[WECHATY](https://github.com/Chatie/wechaty) API 写的一个微信管理工具，因为自己也在做公众号，本来 windows 上有 wetool，但是不能在 mac 上用，就让我想起了做这个项目。

## 安装
```bash
$ git clone https://github.com/crazylxr/wechat-tool.git
$ cd wechat-tool && npm install
& node main.js
```
## 快速开始
有三个文件需要更改：
- config.js 里更改 roomTopic ,这个是你需要管理的群名
- resource.js 里需要更改关键词回复的内容，js 对象形式
- welecome.js 欢迎语配置
## 功能列表
- 设置资源关键字
- 根据资源关键字在群内回复
- 群聊加入人的欢迎语
## 截图
**根据资源关键字在群内回复**

![](http://ph959l7d5.bkt.clouddn.com/IMG_3463.PNG)

## todoList
- 自动加好友
- 根据关键词拉群
- 违规者踢出群
- 写一个界面
## 不足之处
通过 issue 告诉我
## FAQ
有问题 issue 告诉我
## Change Log（更新日志）
还没有正式版本