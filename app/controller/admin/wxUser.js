const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    const res = await this.ctx.model.WeappUser.findAll({ 
      where: { 
        nickName: { 
          [ctx.app.Sequelize.Op.like]: `%${ctx.query.keyword || ''}%`,
          [ctx.app.Sequelize.Op.not]: null,   
         },
      } 
    });
    this.ctx.body = {
      data: res,
      message: '查询成功'
    }
  }
  // 单条删除
  async destroy() {
    const ctx = this.ctx;
    const user = await ctx.model.WeappUser.findByPk(ctx.params.id);
    if (!user) ctx.throw(200, '用户不存在');
    const res = await user.destroy();
    ctx.body = {
      data: res,
      message: '删除成功'
    };
  }
  // 批量删除
  async removes(){
    const ctx = this.ctx;
    const rows = await ctx.model.WeappUser.destroy({ 
      where: {
        id: { [ctx.app.Sequelize.Op.in]: ctx.request.body.ids }
      }
     });
    ctx.body = {
      message: '删除成功'
    }
  }
}

module.exports = HomeController;