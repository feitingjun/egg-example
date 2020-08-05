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
        len: { args: [2, 18], msg: "用户名长度必须在6到18个字符之间" },
        // is: { args: ["^[a-zA-Z][a-zA-Z0-9_]*$"], msg: "用户名格式错误" },
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
    sex: {
      type: INTEGER,
      defaultValue: 0
    },
    email: {
      type: STRING(30),
      // allowNull: false,//非空
      unique: true,//唯一
      validate: {
        // notNull: { msg: '邮箱不能为空' },
        // notEmpty: { msg: '邮箱不能为空' },
        is: { args: ["^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"], msg: "邮箱格式错误" },
        isUnique: (email, next) => {
          User.findOne({ where: { email: email } })
            .done((email) => {
              if (email) {
                next("邮箱已存在");//next传值则进入错误，不传正确
              } else {
                next();
              }

            })
        }
      }
    },
    role_id: UUID,
    headpic: STRING(255),
    create_by: UUID,
    update_by: UUID
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  User.associate = () => {
    // 一对多
    // app.model.User.hasMany(app.model.Diary, { foreignKey: 'user_id', targetKey: 'id'});
    /**
     * User.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
    */
    // 一对一, 关联后会将User模型内的一个字段作为外键，默认外键名称是用Role的模型名称和主键生成，这儿就是role_id,
    // 也可以用foreignKey和targetKey分别指定在原模型(User)中的外键和目标模型(Role)中的关联字段
    // 关联后会在User的模型中的数据中添加以目标模型名称为名的字段，可以通过as重命名，然后在关联查询是同样需要用as重命名
    app.model.User.belongsTo(app.model.Role, { foreignKey: 'role_id', targetKey: 'id' });
  }
  return User;
};