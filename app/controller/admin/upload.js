const menu = require('../../model/menu');
const fs = require('fs');

const Controller = require('egg').Controller;

class ControllerClass extends Controller {
  // 上传图片
  async create(){
    const ctx = this.ctx;
    const result = await ctx.helper.getFormData();
    this.ctx.body = {
      data: result,
      message: '上传成功'
    }; 
  }
  // 删除图片
  async destroy() {
    const ctx = this.ctx;
    const filenames = ctx.request.body.filenames;
    filenames.map(v => {
      const path = 'app/public' + v;
      if(fs.existsSync(path)){ // 判断文件是否存在
        fs.unlinkSync(path); // 删除文件
      }
    })
    ctx.body = {
      message: '删除成功'
    }
  }
}

module.exports = ControllerClass;