module.exports = app => {
  const { controller, jwt } = app;

  // 处理特定前缀的路由，小程序端
  const weappRouter = app.router.namespace('/weapp');
  // 登录
  weappRouter.get('/login', 'weapp.user.index');
  // 修改用户信息
  weappRouter.post('/user/update', jwt, 'weapp.user.update');

}