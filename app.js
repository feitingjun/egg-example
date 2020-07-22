const colors = require('colors');
// const LocalStrategy = require('passport-local').Strategy;

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