module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;

  const HomeNavData = app.model.define('home_nav_data', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    name: STRING,
    page: STRING,
    param: STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return HomeNavData;
};