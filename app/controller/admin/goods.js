const Controller = require('egg').Controller;
const fs = require('fs');

class ControllerClass extends Controller {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    const where = { 
      [ctx.app.Sequelize.Op.or]: [{
        name: { [ctx.app.Sequelize.Op.like]: `%${ctx.query.keyword || ''}%` }
      },{
        code: { [ctx.app.Sequelize.Op.like]: `%${ctx.query.keyword || ''}%` }
      }]
    }
    if(ctx.query.category_id) where.category_id = ctx.query.category_id;
    const rows = await ctx.helper.queryPager({ 
      ...ctx.query,  
      where: where,
      order: [['created_at', 'DESC']],
      include: [{
        model: ctx.app.model.Category
      }]
    }, 'Goods');
    ctx.body = {
      data: rows,
      message: '查询成功'
    }
  }
  // 单条查询
  async show() {
    const ctx = this.ctx;
    const res = await ctx.model.Goods.findByPk(ctx.params.id);
    if(!res){
      ctx.throw(200, '商品不存在');
    }
    this.ctx.body = {
      data: res,
      message: '查询成功'
    };
  }
  // 新增
  async create(){
    const ctx = this.ctx;
    const result = await ctx.helper.getFormData();
    const res = await ctx.model.Goods.create(result);
    this.ctx.body = {
      data: res,
      message: '新增成功'
    }; 
  }
  // 修改
  async update() {
    const ctx = this.ctx;
    const row = await ctx.model.Goods.findByPk(ctx.params.id);
    if (!row) ctx.throw(200, '商品不存在');
    const result = await ctx.helper.getFormData();
    const oldBanner = row.dataValues.banner&&row.dataValues.banner.split(',') || [];
    const neWBanner = result.banner&&result.banner.split(',') || [];
    // 删除旧的缩略图
    if(result.thumb && row.thumb != result.thumb){
      const path = 'app/public' + row.thumb;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    }
    // 删除不存在的banner图
    neWBanner.length>0 && oldBanner&&oldBanner.map(v => {
      if(neWBanner.indexOf(v) == -1){
        const path = 'app/public' + v;
        if(fs.existsSync(path)){ // 判断文件是否存在
          fs.unlinkSync(path); // 删除文件
        }
      }
    })
    const res = await row.update(result);
    ctx.body = {
      data: res,
      message: '更新成功'
    }
  }
  // 单条删除
  async destroy() {
    const ctx = this.ctx;
    const row = await ctx.model.Goods.findByPk(ctx.params.id);
    if(!row) this.ctx.throw(200, '商品不存在');
    if(row.thumb){
      const path = 'app/public' + row.thumb;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    }
    // 删除banner图
    row.banner&&row.banner.split(',').map(v => {
      const path = 'app/public' + v;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    })
    await row.destroy();
    ctx.body = {
      message: '删除成功'
    }
  }
  // 批量删除
  async removes(){
    const ctx = this.ctx;
    const rows = await ctx.model.Goods.destroy({ 
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