const colors = require('colors');
const LocalStrategy = require('passport-local').Strategy;

class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    configWillLoad() {
        // 此时 config 文件已经被读取并合并，但是还并未生效
        // 这是应用层修改配置的最后时机
        // 注意：此函数只支持同步调用

        // console.log('配置文件即将加载'.green);
    }
    async configDidLoad() {
        // console.log('配置文件加载完成'.green);
    }
    async didLoad() {
        // 所有的配置已经加载完毕
        // 可以用来加载应用自定义的文件，启动自定义的服务
        // console.log('文件加载完成'.green);
        const app = this.app;
        app.passport.use(new LocalStrategy({
            passReqToCallback: true,
        }, (req, username, password, done) => {
            // format user
            const user = {
                provider: 'local',
                username,
                password,
            };
            app.passport.doVerify(req, user, done);
        }));
    
        // 处理用户信息验证
        app.passport.verify(async (ctx, { username, password }) => {
            const user = await ctx.model.User.findOne({ where: { username } })
            if(!user) ctx.throw('用户不存在');
            if(password !== user.password) ctx.throw('密码错误');
            return user.id;
        });
        //用户信息序列化到session(接受上一个函数给予的user，保存到session)
        app.passport.serializeUser(async (ctx, id) => {
            return {id: id};
        });
        //session反序列化到用户(这个函数是从session反查到用户);
        app.passport.deserializeUser(async (ctx, { id }) => {
            return { id };
        });
    }

    async willReady() {
        // 所有的插件都已启动完毕，但是应用整体还未 ready
        // 可以做一些数据初始化等操作，这些操作成功才会启动应用
        // await this.app.model.sync();//创建表
        // console.log('插件启动完毕'.green);
    }

    async didReady() {
        // 应用已经启动完毕
        // console.log('worker 准备就绪'.green);
    }

    async serverDidReady() {
        // http / https server 已启动，开始接受外部请求
        // 此时可以从 app.server 拿到 server 的实例

        console.log('应用启动完成'.green);
    }

    async beforeClose() {

        console.log('应用即将关闭'.green);
    }
}

module.exports = AppBootHook;