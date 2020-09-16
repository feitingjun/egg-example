module.exports = app => {
  const { STRING, UUID, UUIDV4, FLOAT } = app.Sequelize;

  const Category = app.model.define('categorys', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    name: STRING,
    sort: FLOAT(11),
    remark: STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Category.associate = () => {
    // 一对多
    app.model.Category.hasMany(app.model.Goods, { foreignKey: 'category_id', targetKey: 'id'});
  }
  return Category;
};