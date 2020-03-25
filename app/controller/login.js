const Controller = require('egg').Controller;

class ControllerClass extends Controller {
    // 根据session获取用户信息
    async info() {
        const ctx = this.ctx;
        const user = await ctx.model.User.findByPk(ctx.user.id);
        ctx.body = {
            data: user,
            message: '获取用户信息成功'
        }
    }
    async loginFail() {
        const ctx = this.ctx;
        if(!ctx.request.body.username || !ctx.request.body.password){
            ctx.throw(200, '用户名或密码错误');
        }
    }
    async logout() {
        const ctx = this.ctx;
        ctx.logout();
        ctx.body = {
            message: '退出登录成功'
        }
    }
}

module.exports = ControllerClass;