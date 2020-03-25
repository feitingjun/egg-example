const Controller = require('egg').Controller;

class HomeController extends Controller {
    // 列表查询
    async index() {
        const res = await this.service.user.index();
        this.ctx.body = {
            data: res,
            message: '查询成功'
        };
    }
    // 单条查询
    async show() {
        const res = await this.service.user.show();
        this.ctx.body = {
            data: res,
            message: '查询成功'
        };
    }
    // 新增用户
    async create() {
        const res = await this.service.user.create();
        this.ctx.body = {
            data: res,
            message: '新增成功'
        };
    }
    // 修改用户
    async update() {
        const res = await this.service.user.update();
        this.ctx.body = {
            data: res,
            message: '修改成功'
        };
    }
    // 删除用户
    async destroy() {
        const res = await this.service.user.destroy();
        this.ctx.body = {
            data: res,
            message: '删除成功'
        };
    }
}

module.exports = HomeController;