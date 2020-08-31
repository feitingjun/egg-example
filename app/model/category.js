module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;

  const Category = app.model.define('categorys', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    name: STRING,
    sort: STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Category;
};