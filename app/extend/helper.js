const path = require('path');
const fs = require('fs');

const toInt = str => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

module.exports = {
  // 分页查询
  async queryPager(query, model, isPage = true) {
    const ctx = this.ctx;
    const pageSize = toInt(ctx.query.pageSize) || 10;
    const pageIndex = ctx.query.pageIndex && ctx.query.pageIndex > 0 ? toInt(ctx.query.pageIndex) : 1;
    const offset = (pageIndex - 1) * pageSize;
    if (isPage) query = { limit: pageSize, offset, ...query };
    console.log(query)
    const { rows: data, count: total } = await ctx.model[model].findAndCountAll(query);
    const page = isPage ? {
      pageIndex, pageSize
    } : {}
    return { data, total, ...page };
  },

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

};