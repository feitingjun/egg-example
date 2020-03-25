module.exports = () => {
    return async function (ctx, next) {
        if(!ctx.isAuthenticated() && (ctx.path !== '/login' || (ctx.path === '/login' && ctx.method !== 'POST'))){
            ctx.throw(401, '未登录')
        }
        await next();
    };
};