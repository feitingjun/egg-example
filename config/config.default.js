const path = require('path');

module.exports = appInfo => {
  return {
    appid: 'wxfa99ff66e9609acb',
    secret: 'a8fc6a77ad138589cefba2cfe4b752d7',
    keys: '6543345653123465_9023499',
    domainName: 'http://192.168.1.9:7001',
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'egg',
      username: 'root', // 用户名
      password: '4888982138fei', // 口令
      timezone: '+08:00' ,// 保存为本地时区
      define: {
        underscored: true //数据库是否使用下划线
      },
      dialectOptions: {
        dateStrings: true,
        // typeCast(field, next) {
        //   // 返回数据时格式化时间
        //   if (field.type === 'DATETIME') {
        //     return field.string();
        //   }
        //   return next();
        // }
        typeCast: true
      }
    },
    middleware: ['errorHandler', 'isLogin', 'notfoundHandler', 'accessToken'],
    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/',
    },
    security: {
      csrf: {
        enable: false
      }
    },
    jwt: {
      secret: "123432dsew453g4"
    },
    static: {
      // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
      prefix: '/upload',
      dir: path.join(appInfo.baseDir, 'app/public/upload'), // 静态化目录,可以设置多个静态化目录
      dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
      preload: false,
      maxAge: 31536000, // in prod env, 0 in other envs
      buffer: true, // in prod env, false in other envs
    },
    httpclient: {
      request: {
        // 默认 request 超时时间
        timeout: 180000,
        dataType: 'json'
      },
    }
  }
};