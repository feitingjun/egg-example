module.exports = () => {
  return async function (ctx, next) {
    // const notVerify = ['/login', '/register'];
    // if ( !ctx.isAuthenticated()  && notVerify.indexOf(ctx.path) ==-1 ) {
    //   ctx.throw(401, '未登录')
    // }
    ctx.domainName = ctx.protocol + '://' + ctx.host;
    await next();
  };
};