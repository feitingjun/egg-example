const Controller = require('egg').Controller;

class ControllerClass extends Controller {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    const row = await ctx.model.Category.findByPk(this.ctx.query.category_id, {
      include: [{
        model: ctx.app.model.AttrKey,
        where: { attr_key_name: { [ctx.app.Sequelize.Op.like]: `%${ctx.query.keyword || ''}%` } },
        required: false
      }],
      order: [[ctx.model.AttrKey, 'sort', 'DESC']],
    })

    ctx.body = {
      data: row,
      message: '查询成功'
    }
  }

  // 新增
  async create(){
    const ctx = this.ctx;
    const { count } = await ctx.model.AttrKey.findAndCountAll();
    const sort = count * 2048 || 2;
    const res = await ctx.model.AttrKey.create({ ...ctx.request.body, sort });
    this.ctx.body = {
      data: res,
      message: '新增成功'
    }; 
  }
  // 修改
  async update() {
    const ctx = this.ctx;
    const row = await ctx.model.AttrKey.findByPk(ctx.params.id);
    if (!row) ctx.throw(200, '分类不存在');
    const res = await row.update(ctx.request.body);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }
  // 单条删除
  async destroy() {
    const ctx = this.ctx;
    const row = await ctx.model.AttrKey.findByPk(ctx.params.id);
    if(!row) this.ctx.throw(200, '分类不存在');
    await row.destroy();
    ctx.body = {
      message: '删除成功'
    }
  }
  // 批量删除
  async removes(){
    const ctx = this.ctx;
    const rows = await ctx.model.AttrKey.destroy({ 
      where: {
        id: { [ctx.app.Sequelize.Op.in]: ctx.request.body.ids }
      }
     });
    ctx.body = {
      message: '删除成功'
    }
  }
  // 排序
  async sort(){
    const ctx = this.ctx;
    const list = ctx.request.body.list
    await ctx.model.AttrKey.bulkCreate( list, { updateOnDuplicate: [ 'sort' ] } );
    // const rows = await ctx.model.AttrKey.findAll({ 
    //   where: { id: { [ctx.app.Sequelize.Op.in]: list.map(v => v.id) }} ,
    //   order: [['sort', 'DESC']]
    // })
    ctx.body = {
      message: '排序成功'
    }
  }
}

module.exports = ControllerClass;