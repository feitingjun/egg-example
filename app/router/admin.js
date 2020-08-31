module.exports = app => {
  const { controller, jwt } = app;

  // 处理特定前缀的路由，后台管理
  const adminRouter = app.router.namespace('/admin');

  // 登录
  adminRouter.post('/login', controller.admin.login.login);
  // 根据token获取用户信息
  adminRouter.get('/info', jwt, 'admin.login.info');
  // adminRouter.get('/logout', controller.login.logout);

  // RESTful风格的路由，用户增删改查
  adminRouter.resources('/user', jwt, controller.admin.user);
  adminRouter.del('/user', jwt, 'admin.user.removes')

  //菜单，controller可以简写
  adminRouter.resources('/menu', jwt, 'admin.menu')
  adminRouter.post('/menu/sort', jwt, 'admin.menu.sort')

  // 角色
  adminRouter.resources('/role', jwt, 'admin.role')
  adminRouter.del('/role', jwt, 'admin.role.removes')

  // 微信用户
  adminRouter.resources('/wxUser', jwt, 'admin.wxUser')
  adminRouter.del('/wxUser', jwt, 'admin.wxUser.removes')
}