module.exports = app => {
  const { controller, jwt } = app;

  // 处理特定前缀的路由，后台管理
  const adminRouter = app.router.namespace('/admin');

  // RESTful风格的路由，用户增删改查
  adminRouter.resources('/user', jwt, controller.admin.user);

  //菜单，controller可以简写
  adminRouter.resources('/menu', jwt, 'admin.menu')

  // 根据token获取用户信息
  adminRouter.get('/info', jwt, 'admin.login.info');
  // adminRouter.get('/logout', controller.login.logout);

  // 登录
  adminRouter.post('/login', controller.admin.login.login);
}