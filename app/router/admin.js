module.exports = app => {
  const { controller, jwt } = app;

  // 处理特定前缀的路由，后台管理
  const adminRouter = app.router.namespace('/admin');

  // 登录
  adminRouter.post('/login', controller.admin.login.login);
  // 根据token获取用户信息
  adminRouter.get('/info', jwt, 'admin.login.info');
  // adminRouter.get('/logout', controller.login.logout);

  // 上传文件
  adminRouter.post('/upload', jwt, 'admin.upload.create')
  adminRouter.del('/upload', jwt, 'admin.upload.destroy')

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

  // 商品分类
  adminRouter.resources('/category', jwt, 'admin.category')
  adminRouter.del('/category', jwt, 'admin.category.removes')
  adminRouter.post('/category/sort', jwt, 'admin.category.sort')

  // 商品
  adminRouter.resources('/goods', jwt, 'admin.goods')
  adminRouter.del('/goods', jwt, 'admin.goods.removes')

  // 首页轮播图
  adminRouter.resources('/banner', jwt, 'admin.banner')
  adminRouter.del('/banner', jwt, 'admin.banner.removes')
  adminRouter.post('/banner/sort', jwt, 'admin.banner.sort')

  // 首页导航菜单
  adminRouter.resources('/home_nav', jwt, 'admin.homeNav')
  adminRouter.del('/home_nav', jwt, 'admin.homeNav.removes')
  adminRouter.post('/home_nav/sort', jwt, 'admin.homeNav.sort')
  adminRouter.get('/home_nav/data', jwt, 'admin.homeNav.getNavData')
}