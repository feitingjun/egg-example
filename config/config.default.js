const config = {
  keys: '6543345653123465_9023499',
  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg',
    username: 'root', // 用户名
    password: '4888982138fei', // 口令
    timezone: '+08:00' ,// 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // 返回数据时格式化时间
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      }
    }
  },
  middleware: ['errorHandler', 'isLogin', 'notfoundHandler'],
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
  }
}
module.exports = config;