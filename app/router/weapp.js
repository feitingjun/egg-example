module.exports = app => {
  const { controller, jwt } = app;

  // 处理特定前缀的路由，小程序端
  const weappRouter = app.router.namespace('/weapp');
  // 登录
  weappRouter.get('/login', 'weapp.user.index');
  // 修改用户信息
  weappRouter.post('/user/update', jwt, 'weapp.user.update');

  // 首页轮播图
  weappRouter.get('/banner', 'admin.banner.index')
  // 首页导航菜单
  weappRouter.get('/home_nav', 'admin.homeNav.index')
  // 首页推荐商品
  weappRouter.get('/recommend', 'weapp.goods.recommend')
  // 分类
  weappRouter.get('/category', 'weapp.goods.category')
  // 商品详情
  weappRouter.get('/goods/:id', jwt, 'weapp.goods.show')
  // 收藏商品
  weappRouter.post('/collect/goods', jwt, 'weapp.collect.collectGoods')
  weappRouter.post('/collect/cancel', jwt, 'weapp.collect.destroy')
  // 评论
  weappRouter.get('/comment/:goodsId', jwt, 'weapp.comment.index')
}