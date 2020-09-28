const Controller = require('egg').Controller;
const fs = require('fs');
const collect = require('../../model/collect');

class ControllerClass extends Controller {
  // 首页推荐商品查询
  async recommend() {
    const ctx = this.ctx;
    const res = await ctx.model.Goods.findAll({ where: { recommend: 1 } });
    res.map(v => v.setDataValue('full_thumb', ctx.domainName + v.thumb));
    this.ctx.body = {
      data: res,
      message: '查询成功'
    };
  }
  // 单条查询
  async show() {
    const ctx = this.ctx;
    const res = await ctx.model.Goods.findByPk(ctx.params.id, {
      // 统计收藏数量
      include: [{
        model: ctx.app.model.Collect,
        where: {
          record_id: ctx.params.id
        },
        required: false, //不写这个的话，Collect表中如果不存在满足where的数据，则连主表的数据都不会返回
        attributes: []
      }],
      attributes: {
        include: [
          [ctx.app.Sequelize.fn('COUNT', ctx.app.Sequelize.col('collects.id')), 'collectNum']
        ]
      }
    });
    const isCollect = await ctx.model.Collect.findOne({
      where: {
        uid: ctx.state.user.id,
        record_id: ctx.params.id
      }
    })
    res.setDataValue('isCollect', !!isCollect)
    res.setDataValue('full_thumb', ctx.domainName + res.thumb);
    res.setDataValue('full_banner', res.banner && res.banner.split(',').map(v => ctx.domainName + v));
    res.setDataValue('full_detail', res.detail && res.detail.replace(RegExp('src="/upload/', 'g'), `src="${ctx.domainName}/upload/`));
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
    res.map(v => v.goods.map(vv => vv.setDataValue('full_thumb', ctx.domainName + vv.thumb)))
    ctx.body = {
      data: res,
      message: '查询成功'
    };
  }
}

module.exports = ControllerClass;