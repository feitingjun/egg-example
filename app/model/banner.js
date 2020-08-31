module.exports = app => {
  const { STRING, UUID, INTEGER, UUIDV4 } = app.Sequelize;

  const Banner = app.model.define('banners', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    name: STRING,
    good_id: UUID,
    url: STRING,
    sort: INTEGER
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Banner;
};