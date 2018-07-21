1.了解清楚需求，项目干嘛的，功能点有哪些
2.项目框架
3.一个页面大致有什么功能点
1. 因为每个页面都会滚动,所以注册公共的全局组件appContent.vue,在里面创建滚动视图new IScroll()操作;给每个页面用这个组件包裹即可滚动;
2.swiper 滑动插件也可复用;
3.axios请求数据: 特意提出一个js文件进行axios各种请求操作,让vue文件更专注于逻辑代码;
4.定义公共的接口api目录下js文件;需要用的地方import引入;
5.axios 跨域请求用中间件时:需在server.js添加代码后 (注意:一定要重启服务器)
\node_modules\_webpack-dev-server@2.11@webpack-dev-server\lib\server.js文件下添加: 
const app = this.app = new express(); //这段文件已有代码后添加
app.use("/v4",httpProxyMiddleware({
  target: "https://m.maizuo.com",
  changeOrigin: true
}))
6. 请求动态数据后需更新滚动视图,setTimeout里更新IScroll;

项目目录
main.js ----------------  项目入口文件

App.vue ----------------  项目的根组件

common -----------------  放置公共组件的目录

pages ------------------  放置每一个页面的目录

router ----------------- 放置路由的目录

services ---------------  放置数据请求和处理的文件目录


api ---------------  放置所有项目用到的接口




https://m.maizuo.com/v4/api/billboard/home?__t=1531376299343

https://m.maizuo.com/v4/api/film/now-playing?__t=1531376299351&page=1&count=5

https://m.maizuo.com/v4/api/film/coming-soon?__t=1531376299354&page=1&count=3




