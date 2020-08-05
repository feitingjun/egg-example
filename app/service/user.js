const Service = require('egg').Service;
const fs = require('fs')
const path = require('path')

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
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    return user;
  }

  // 新增用户
  async create() {
    const ctx = this.ctx;
    const result = await this.getFormData();
    const data = { ...result, createBy: ctx.state.user.id, updateBy: ctx.state.user.id }
    return await ctx.model.User.create(data);
  }

  // 更新用户
  async update() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    const result = await this.getFormData();
    return await user.update({...result, updateBy: ctx.state.user.id});
  }

  // 删除用户
  async destroy() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(ctx.params.id);
    if (!user) this.ctx.throw(200, '用户不存在');
    return await user.destroy();
  }

  // 获取formdata参数
  async getFormData() {
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    let result = {};
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
        let length = 0
        if (part.length) {
            // 获取其他参数
            if(part[1] === 'undefined' || part[1] === 'null' || part[1] ==='') part[1] = null;
            result[part[0]] = part[1];
        } else {
          if (!part.filename) return
          // 处理文件流
          const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(part.filename);
          let filePath = path.join( ctx.app.baseDir,'app/public/upload', filename) // 保存地址
          let writable = fs.createWriteStream(filePath)// 创建写入流
          await part.pipe(writable) // 开始写入
          result[part.fieldname] = '/upload/' + filename;
        }
    }
    return result;
  }
}

module.exports = UserService;