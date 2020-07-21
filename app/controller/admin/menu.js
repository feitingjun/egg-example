const Controller = require('egg').Controller;

class MenuController extends Controller {

  // 树级查询
  async index() {
    const ctx = this.ctx;
    const res = await ctx.service.user.getChildNode(0);
    this.ctx.body = {
      data: res,
      message: '查询成功'
    };
  } 
  
  // 新增菜单
  async create() {
    const ctx = this.ctx;
    const res = await ctx.model.Menu.create(ctx.request.body);
    this.ctx.body = {
      data: res,
      message: '新增成功'
    };
  }
}

module.exports = MenuController;