const Service = require('egg').Service;
const fs = require('fs')

class UserService extends Service {
  // 列表查询
  async index() {
    const ctx = this.ctx;
    return await ctx.helper.queryPager({
      ...ctx.query,  
      attributes: { exclude: ['password'] },
      where: { username: { [ctx.app.Sequelize.Op.like]: `%${ctx.query.keyword || ''}%` } },
      include: [{
        model: ctx.app.model.Role
      }]
    }, 'User');
  }

  // 单条查询
  async show() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id, {
      // include: [{
      //   model: ctx.app.model.Role
      // }]
      attributes: { exclude: ['password'] }
    });
    if (!user) this.ctx.throw(200, '用户不存在');
    return user;
  }

  // 新增用户
  async create() {
    const ctx = this.ctx;
    const result = await ctx.helper.getFormData();
    const data = { ...result, createBy: ctx.state.user.id, updateBy: ctx.state.user.id }
    return await ctx.model.User.create(data);
  }

  // 更新用户
  async update() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    const result = await ctx.helper.getFormData();
    // 删除旧的图片文件
    if(user.headpic != result.headpic){
      const path = 'app/public' + user.headpic;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    }
    return await user.update({...result, updateBy: ctx.state.user.id});
  }

  // 删除用户
  async destroy() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    // 删除头像文件
    if(user.headpic){
      const path = 'app/public' + user.headpic;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    }
    return await user.destroy();
  }
}

module.exports = UserService;