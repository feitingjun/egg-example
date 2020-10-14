module.exports = app => {
  const { STRING, UUID, INTEGER, UUIDV4 } = app.Sequelize;

  const AttrValue = app.model.define('attr_values', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    attr_key_id: {
      type: UUID,
      allowNull: false,//非空
      validate: {
        notNull: { msg: '请关联分类' },
        notEmpty: { msg: '请关联分类' }
      }
    },
    goods_id: UUID,
    attr_value_name: {
      type: STRING,
      allowNull: false,//非空
      validate: {
        notNull: { msg: '属性名称不能为空' },
        notEmpty: { msg: '属性名称不能为空' }
      }
    },
    remark: STRING,
    sort: INTEGER
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  AttrValue.associate = () => {
    app.model.AttrValue.belongsTo(app.model.Category, { foreignKey: 'category_id', targetKey: 'id' });
  }
  // AttrValue.associate = () => {
  //   app.model.AttrValue.belongsTo(app.model.AttrKey, { foreignKey: 'attr_key_id', targetKey: 'id' });
  // }
  return AttrValue;
};