module.exports = app => {
  const { STRING, UUID, DOUBLE, INTEGER, UUIDV4 } = app.Sequelize;

  const Good = app.model.define('goods', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    name: STRING,
    category_id: UUID,
    price: DOUBLE(11, 2),
    original_price: DOUBLE(11, 2),
    detail: STRING(1234),
    sales: INTEGER,
    status: INTEGER,
    property: STRING(1234),
    thumb: STRING,
    recommend: INTEGER
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Good;
};