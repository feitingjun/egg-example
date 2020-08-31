const fs = require('fs');

module.exports = () => {
  return async function (ctx, next) {
    const data = JSON.parse(fs.readFileSync('app/public/accessToken.json'));
    ctx.accessToken = data.access_token;
    await next();
  };
};