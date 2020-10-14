const Controller = require('egg').Controller;

class ControllerClass extends Controller {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    const rows = await ctx.helper.queryPager({ 
      ...ctx.query,  
      where: { 
        goods_id: ctx.params.goodsId
      },
      include: [{
        model: ctx.app.model.WeappUser,
        as: 'from_user'
      },{
        model: ctx.app.model.WeappUser,
        as: 'to_user'
      }],
    }, 'Comment');
    const good = await ctx.model.Comment.count({
      where: {
        grade: { [ctx.app.Sequelize.Op.gte]: 3 }
      }
    })
    rows.good = good;
    ctx.body = {
      data: rows,
      message: '查询成功'
    }
  }
}
module.exports = ControllerClass;