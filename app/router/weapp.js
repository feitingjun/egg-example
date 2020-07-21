module.exports = app => {
  const { controller, jwt } = app;

  // 处理特定前缀的路由，小程序端
  const weappRouter = app.router.namespace('/weapp');

}