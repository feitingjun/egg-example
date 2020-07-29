const Controller = require('egg').Controller;

class MenuController extends Controller {

  // 树级查询
  async index() {
    const ctx = this.ctx;
    const res = await this.getChildNode(0);
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

  // 修改菜单
  async update() {
    const ctx = this.ctx;
    const menu = await ctx.model.Menu.findByPk(ctx.params.id);
    if(!menu) ctx.throw(200, '菜单不存在');
    const res = await menu.update(ctx.request.body);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }
  // 删除
  async destroy() {
    const ctx = this.ctx;
    const children = await ctx.model.Menu.findAll({ where: { pid: ctx.params.id } });
    if(children.length>0) ctx.throw(200, '这个菜单存在子菜单，不能删除');
    const menu = await ctx.model.Menu.findByPk(ctx.params.id);
    if (!menu) ctx.throw(200, '菜单不存在');
    const res = await menu.destroy();
    ctx.body = {
      data: res,
      message: '删除成功'
    };
  }

  async getChildNode(pid){
    const ctx = this.ctx;
    const res = await ctx.model.Menu.findAll({ where: { pid, id: { [ctx.app.Sequelize.Op.ne]: 1 } } });
    return await Promise.all(res.map(async v => { 
      v.dataValues.children = await this.getChildNode(v.id); 
      return v;
     }));
  }
}

module.exports = MenuController;