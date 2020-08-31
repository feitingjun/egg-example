const Controller = require('egg').Controller;

class ControllerClass extends Controller {

  // 登录
  async index() {
    const ctx = this.ctx;
    const app = this.app;
    const { code } = ctx.query;
    const { data } = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session`, {
      data: {
        appid: this.app.config.appid,
        secret: this.app.config.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    const res = await ctx.model.WeappUser.findCreateFind({ where: { openid: data.openid } })
    const row = await res[0].update({login_at: new Date()})
    const token = app.jwt.sign({
      id: row.id
    }, app.config.jwt.secret, {
      expiresIn: '7200s', //有效时间
    })
    ctx.body = {
      data: {
        userInf: row,
        token
      }
    }
  }

  // 更新用户信息
  async update() {
    const ctx = this.ctx;
    const user = await ctx.model.WeappUser.findByPk(ctx.state.user.id);
    if (!user) ctx.throw(200, '用户不存在');
    const res = await user.update(ctx.request.body);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }
}

module.exports = ControllerClass;