const menu = require('../../model/menu');

const Controller = require('egg').Controller;

class ControllerClass extends Controller {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    const rows = await ctx.helper.queryPager({ 
      ...ctx.query,  
      where: { name: { [ctx.app.Sequelize.Op.like]: `%${ctx.query.keyword || ''}%` } }
    }, 'Role');
    rows.data = await Promise.all(rows.data.map(async v => {
      v.dataValues.auth = v.auth ? await Promise.all(v.auth.split(',').map(async id => {
        const data = await ctx.model.Menu.findByPk(id);
        return  data
      })) : null;
      v.dataValues.auth = v.dataValues.auth.filter(v => !!v);
      return v;
    }))
    ctx.body = {
      data: rows,
      message: '查询成功'
    }
  }

  // 新增
  async create(){
    const ctx = this.ctx;
    const { count } = await ctx.model.Role.findAndCountAll();
    const sort = count * 2048 || 2;
    const res = await ctx.model.Role.create({ ...ctx.request.body, sort });
    this.ctx.body = {
      data: res,
      message: '新增成功'
    }; 
  }
  // 修改
  async update() {
    const ctx = this.ctx;
    const role = await ctx.model.Role.findByPk(ctx.params.id);
    if (!role) ctx.throw(200, '角色不存在');
    const res = await role.update(ctx.request.body);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }
  // 单条删除
  async destroy() {
    const ctx = this.ctx;
    const role = await ctx.model.Role.findByPk(ctx.params.id);
    if(!role) this.ctx.throw(200, '角色不存在');
    await role.destroy();
    ctx.body = {
      message: '删除成功'
    }
  }
  // 批量删除
  async removes(){
    const ctx = this.ctx;
    const rows = await ctx.model.Role.destroy({ 
      where: {
        id: { [ctx.app.Sequelize.Op.in]: ctx.request.body.ids }
      }
     });
    ctx.body = {
      message: '删除成功'
    }
  }
}

module.exports = ControllerClass;