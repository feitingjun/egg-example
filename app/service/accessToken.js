const Service = require('egg').Service;
const fs = require('fs')
const colors = require('colors');

class TokenService extends Service {
  async index() {
    const ctx = this.ctx;
    const { data } = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${ctx.app.config.appid}&secret=${ctx.app.config.secret}`, {
      dataType: 'json',
    });
    ctx.accessToken = data.access_token;
    let str = JSON.stringify(data, null, "\t")
    const err = fs.writeFileSync('app/public/accessToken.json', str);
    if(!err) console.log('获取access_token成功'.green)
  }
  
  // 调用微信需要access_token的接口，自动写入access_token, 发现access_token失效后自动更新access_token后重新调用接口，但是防止死循环只重新调用一次
  async request(url, options={}) {
    const ctx = this.ctx;
    if(!options.data) options.data = {};
    url = url + '?access_token=' + ctx.accessToken
    const requestData = { ...options.data }
    let result = await ctx.curl(url, {
      ...options, 
      data: requestData,
      contentType: 'json'
    })
    if(result.status != 200){
      ctx.throw(status, result.res);
    }
    if(result.data.errcode == 40001){
      await this.index();
      let result = await ctx.curl(url, {...options, data: {...requestData }});
      return result;
    }
    return result;
  }
}

    // // 获取小程序码
    // const result = await ctx.service.accessToken.request(`https://api.weixin.qq.com/wxa/getwxacodeunlimit`, {
    //   method: 'POST',
    //   dataType: 'text',
    //   data: {
    //     scene: 'deptId=132&pid=3'
    //   }
    // })
module.exports = TokenService;