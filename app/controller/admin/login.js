const Controller = require('egg').Controller;

class ControllerClass extends Controller {

  // 登录
  async login() {
    const ctx = this.ctx;
    const app = this.app;
    const { username, password } = ctx.request.body;

    const user = await ctx.model.User.findOne({ where: { username } })
    if (!user) ctx.throw(200, '用户不存在');
    if (password !== user.password) ctx.throw(200, '密码错误');

    const token = app.jwt.sign({
      id: user.id
    }, app.config.jwt.secret, {
      expiresIn: '7200s', //有效时间
    })
    const menuList = await this.getChildNode(0);
    ctx.body = {
      data: {
        token,
        userInfo: user,
        menuList: menuList
      },
      message: '登录成功'
    }
  }
  // 根据token获取用户信息
  async info() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.state.user.id);
    const menuList = await this.getChildNode(0);
    ctx.body = {
      data: {
        userInfo: user,
        menuList: menuList
      },
      message: '获取用户信息成功'
    }
  }
  async loginFail() {
    const ctx = this.ctx;
    if (!ctx.request.body.username || !ctx.request.body.password) {
      ctx.throw(200, '用户名或密码错误');
    }
  }
  async logout() {
    const ctx = this.ctx;
    ctx.logout();
    ctx.body = {
      message: '退出登录成功'
    }
  }

  async getChildNode(pid){
    const ctx = this.ctx;
    const res = await ctx.model.Menu.findAll({ 
      where: { pid },
      order: [['sort']]
    });
    return await Promise.all(res.map(async v => { 
      v.dataValues.children = await this.getChildNode(v.id); 
      return v;
     }));
  }
}

module.exports = ControllerClass;