const Controller = require('egg').Controller;
const fs = require('fs');

class ControllerClass extends Controller {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    const rows = await ctx.model.Banner.findAll({ 
      where: { name: { [ctx.app.Sequelize.Op.like]: `%${ctx.query.keyword || ''}%` } },
      include: [{
        model: ctx.app.model.Goods,
        as: 'goods'
      }],
      order: [['sort']]
    })
    rows.map(v => v.setDataValue('full_url', ctx.domainName + v.url))
    ctx.body = {
      data: rows,
      message: '查询成功'
    }
  }

  // 新增
  async create(){
    const ctx = this.ctx;
    const result = await ctx.helper.getFormData();
    const { count } = await ctx.model.Banner.findAndCountAll();
    const sort = count * 2048 || 2;
    const res = await ctx.model.Banner.create({ ...result, sort });
    this.ctx.body = {
      data: res,
      message: '新增成功'
    }; 
  }
  // 修改
  async update() {
    const ctx = this.ctx;
    const row = await ctx.model.Banner.findByPk(ctx.params.id);
    const result = await ctx.helper.getFormData();
    if (!row) ctx.throw(200, '数据不存在');
    // 删除旧的缩略图
    if(result.url && row.url != result.url){
      const path = 'app/public' + row.url;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    }
    const res = await row.update(result);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }
  // 单条删除
  async destroy() {
    const ctx = this.ctx;
    const row = await ctx.model.Banner.findByPk(ctx.params.id);
    if(!row) this.ctx.throw(200, '数据不存在');
    if(row.url){
      const path = 'app/public' + row.url;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    }
    await row.destroy();
    ctx.body = {
      message: '删除成功'
    }
  }
  // 批量删除
  async removes(){
    const ctx = this.ctx;
    const rows = await ctx.model.Banner.destroy({ 
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
    await ctx.model.Banner.bulkCreate( list, { updateOnDuplicate: [ 'sort' ] } );
    // const rows = await ctx.model.Banner.findAll({ 
    //   where: { id: { [ctx.app.Sequelize.Op.in]: list.map(v => v.id) }} ,
    //   order: [['sort', 'DESC']]
    // })
    ctx.body = {
      message: '排序成功'
    }
  }
}

module.exports = ControllerClass;