module.exports = app => {
  const { STRING, UUID, UUIDV4, VIRTUAL } = app.Sequelize;

  const HomeNav = app.model.define('home_navs', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    name: STRING,
    page_name: STRING,
    page: STRING,
    icon: STRING,
    sort: STRING,
    param: STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return HomeNav;
};