const Controller = require('egg').Controller;

class ControllerClass extends Controller {

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
    if(ctx.request.body.pid == 1) ctx.throw(200, '这个菜单下不允许新增')
    const { count } = await ctx.model.Menu.findAndCountAll();
    const sort = count * 2048;
    const res = await ctx.model.Menu.create({ ...ctx.request.body, sort });
    this.ctx.body = {
      data: res,
      message: '新增成功'
    };
  }

  // 修改菜单
  async update() {
    const ctx = this.ctx;
    const menu = await ctx.model.Menu.findByPk(ctx.params.id);
    if (!menu) ctx.throw(200, '菜单不存在');
    const res = await menu.update(ctx.request.body);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }
  // 删除
  async destroy() {
    const ctx = this.ctx;
    if(ctx.params.id == 1) ctx.throw(200, '这个菜单不允许删除')
    const children = await ctx.model.Menu.findAll({ where: { pid: ctx.params.id } });
    if (children.length > 0) ctx.throw(200, '这个菜单存在子菜单，不能删除');
    const menu = await ctx.model.Menu.findByPk(ctx.params.id);
    if (!menu) ctx.throw(200, '菜单不存在');
    const res = await menu.destroy();
    ctx.body = {
      data: res,
      message: '删除成功'
    };
  }

  // 排序
  async sort() {
    const ctx = this.ctx;
    const { id, target } = ctx.request.body;
    const currentMenu = await ctx.model.Menu.findByPk(id);
    const targetRow = await ctx.model.Menu.findByPk(target.id);
    if (target.type === 'over') {
      await currentMenu.update({ pid: target.id });
    }
    if (target.type === 'top') {
      const rows = await ctx.model.Menu.findAll({
        order: [['sort', 'desc']],
        where: {
          sort: { [ctx.app.Sequelize.Op.lt]: targetRow.sort }
        },
        limit: 1
      })
      let subSort;
      if (rows.length === 0) {
        subSort = 0
      } else {
        subSort = rows[0].sort;
      }
      await currentMenu.update({ pid: targetRow.pid, sort: (targetRow.sort + subSort) / 2 });
    }
    if (target.type === 'bottom') {
      const rows = await ctx.model.Menu.findAll({
        order: [['sort']],
        where: {
          sort: { [ctx.app.Sequelize.Op.gt]: targetRow.sort }
        },
        limit: 1
      })
      let subSort;
      if (rows.length === 0) {
        subSort = targetRow.sort + 2048
      } else {
        subSort = rows[0].sort;
      }
      await currentMenu.update({ pid: targetRow.pid, sort: (targetRow.sort + subSort) / 2 });
    }
    const res = await this.getChildNode(0);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }

  async getChildNode(pid) {
    const ctx = this.ctx;
    const res = await ctx.model.Menu.findAll({
      // 排除id为1的结果
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