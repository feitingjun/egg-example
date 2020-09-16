const Controller = require('egg').Controller;
const fs = require('fs');

class ControllerClass extends Controller {
  // 首页推荐商品查询
  async recommend() {
    const ctx = this.ctx;
    const res = await ctx.model.Goods.findAll({ where: { recommend: 1 } });
    this.ctx.body = {
      data: res,
      message: '查询成功'
    };
  }
  // 商品分类
  async category() {
    const ctx = this.ctx;
    const res = await ctx.model.Category.findAll({
      include: [{
        model: ctx.app.model.Goods
      }]
    })
    ctx.body = {
      data: res,
      message: '查询成功'
    };
  }
}

module.exports = ControllerClass;