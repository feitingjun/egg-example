const Service = require('egg').Service;

class UserService extends Service {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    return await ctx.helper.queryPager({}, 'User');
  }

  // 单条查询
  async show() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    return user;
  }

  // 新增用户
  async create() {
    const ctx = this.ctx;
    return await ctx.model.User.create(ctx.request.body);
  }

  // 更新用户
  async update() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    return await user.update(ctx.request.body);
  }

  // 删除用户
  async destroy() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    return await user.destroy();
  }

  async getChildNode(sup_id){
    const ctx = this.ctx;
    const res = await ctx.model.Menu.findAll({ where: { sup_id } });
    return await Promise.all(res.map(async v => { 
      v.dataValues.children = await this.getChildNode(v.id); 
      return v;
     }));
  }
}

module.exports = UserService;