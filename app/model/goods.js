const moment = require('moment');
module.exports = app => {
  const { STRING, UUID, DOUBLE, INTEGER, UUIDV4, VIRTUAL } = app.Sequelize;

  const Goods = app.model.define('goods', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    code: {
      type: STRING,
      defaultValue: moment(new Date()).format('YYYYMMDDHHmmss')
    },
    name: STRING,
    category_id: UUID,
    price: DOUBLE(11, 2),
    original_price: DOUBLE(11, 2),
    detail: STRING(1234),
    sales: INTEGER,
    status: {
      type: INTEGER,
      defaultValue: 0 // 0未上架   1上架
    },
    property: STRING(1234),
    thumb: STRING,
    banner: STRING,
    recommend: INTEGER
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Goods.associate = () => {
    app.model.Goods.belongsTo(app.model.Category, { foreignKey: 'category_id', targetKey: 'id' });
    app.model.Goods.hasMany(app.model.Collect, { foreignKey: 'record_id', targetKey: 'id' });
    app.model.Goods.hasMany(app.model.Comment, { foreignKey: 'goods_id', targetKey: 'id' });
  }
  return Goods;
};