## 重构先前的 BT 资源分享网 

此项目在 (https://github.com/rjwx60/bt-share-rebuild) 的基础上进行重新设计和构建，功能如旧，并适配移动端

* 项目基于 React 全家桶开发，前后端分离，
- 前端使用 react-router 搭建路由，用 redux 控制状态的共享，使用 Less 做样式设计
- 后端使用 koa，数据端前期使用模拟的数据，后期将数据转移至 本地的 MongoDB 并重新设计数据获取逻辑
* 移动端的适配用的是 CSS媒体查询，并针对PC端和移动端的操作方式不同，在资源获取上做了组件分离



## 安装包
	npm install 

## 启动后台
	npm run mock

## 启动
	npm run start



## 制作流程

1. 图纸设计，设计页面的布局，理清组件间的关系，并做好功能分配
2. 环境搭建
3. 基本组件、页面的构建，路由的配置
4. 移动端的适配
5. 搭建基本的后台并伪造后台数据，前期使用的是模拟数据，后期将数据迁移至本地的mongodb，并用mongoose操作
6. 完成功能组件的搭建，获取数据等，并完成显示组件的搭建，显示数据
7. 项目的最后修饰


## 项目收获

1. 功能组件和显示组件功能分开，即前者用来处理数据（数据的获取，操作等），后者用来展示数据，对后期的维护起到了很大的帮助
2. 第一次用模块化的设计思想，深深体会到了模块化所带来的便利并为之震撼
3. 项目设计不要一开始就为其加很多功能，这样只会增加它在你脑海中的复杂度，让你无从下手，应由最简单的功能开始，一步一步拓展，深化
4. 项目起初的整体设计是很重要的，就比如我起初根本没有想过用mongodb去重构后台环境，所以导致重构后台时整个后台变得不适配，要全部推翻重做




## 网站首页截图
![](https://github.com/rjwx60/bt-share-rebuild/raw/master/docs/img/home.png)


## 分享页截图
![](https://github.com/rjwx60/bt-share-rebuild/raw/master/docs/img/share.png)


## 登录页截图
![](https://github.com/rjwx60/bt-share-rebuild/raw/master/docs/img/signin.png)


## 注册页面截图
![](https://github.com/rjwx60/bt-share-rebuild/raw/master/docs/img/regi.png)


## 评论页截图
![](https://github.com/rjwx60/bt-share-rebuild/raw/master/docs/img/comment.png)


## 资源列表页截图
![](https://github.com/rjwx60/bt-share-rebuild/raw/master/docs/img/tab1.png)


## 资源列表页截图
![](https://github.com/rjwx60/bt-share-rebuild/raw/master/docs/img/tab2.png)
