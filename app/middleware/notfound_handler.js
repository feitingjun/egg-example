module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404, 'Not Found')
    }
  };
};