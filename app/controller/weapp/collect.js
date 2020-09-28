const Controller = require('egg').Controller;

class ControllerClass extends Controller {
  // 收藏商品
  async collectGoods() {
    const ctx = this.ctx;
    const res = await ctx.model.Collect.create({
      type: 1,
      record_id: ctx.request.body.id,
      uid: ctx.state.user.id
    });
    this.ctx.body = {
      data: res,
      message: '收藏商品成功'
    };
  }
  async destroy() {
    const ctx = this.ctx;
    const rows = await ctx.model.Collect.destroy({
      where: {
        record_id: ctx.request.body.record_id,
        uid: ctx.state.user.id
      }
    })
    ctx.body = {
      message: '取消收藏成功'
    }
  }
}
module.exports = ControllerClass;