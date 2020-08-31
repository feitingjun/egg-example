const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, UUID, UUIDV4, DATE } = app.Sequelize;

  const WeappUser = app.model.define('weapp_users', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    openid: STRING,
    nickName: STRING,
    avatarUrl: STRING,
    gender: INTEGER,
    country: STRING,
    province: STRING,
    city: STRING,
    login_at: {
      type: DATE,
      defaultValue: new Date()
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return WeappUser;
};