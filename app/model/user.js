const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV4 } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    username: {
      type: STRING(30),
      allowNull: false,//非空
      unique: true,//唯一
      validate: {
        notNull: { msg: '用户名不能为空' },
        notEmpty: { msg: '用户名不能为空' },
        len: { args: [6, 18], msg: "用户名长度必须在6到18个字符之间" },
        is: { args: ["^[a-zA-Z][a-zA-Z0-9_]*$"], msg: "用户名格式错误" },
        isUnique: (username, next) => {
          User.findOne({ where: { username: username } })
            .done(user => {
              if (user) {
                next("用户已存在");//next传值则进入错误，不传正确
              } else {
                next();
              }

            })
        }
      }
    },
    password: {
      type: STRING(30),
      allowNull: false,//非空
      validate: {
        len: { args: [6, 18], msg: "密码必须在6到18个字符之间" },
        notNull: { msg: '密码不能为空' },
        notEmpty: { msg: '密码不能为空' }
      }
    },
    age: INTEGER,
    sex: INTEGER,
    email: {
      type: STRING(30),
      allowNull: false,//非空
      unique: true,//唯一
      validate: {
        notNull: { msg: '邮箱不能为空' },
        notEmpty: { msg: '邮箱不能为空' },
        is: { args: ["^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"], msg: "邮箱格式错误" },
        isUnique: (email, next) => {
          User.findOne({ where: { email: email } })
            .done((email) => {
              if (email) {
                next("该邮箱已被注册");//next传值则进入错误，不传正确
              } else {
                next();
              }

            })
        }
      }
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return User;
};