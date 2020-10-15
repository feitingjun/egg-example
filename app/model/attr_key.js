module.exports = app => {
  const { STRING, UUID, INTEGER, UUIDV4 } = app.Sequelize;

  const AttrKey = app.model.define('attr_keys', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    category_id: {
      type: UUID,
      allowNull: false,//非空
      validate: {
        notNull: { msg: '请关联分类' },
        notEmpty: { msg: '请关联分类' }
      }
    },
    attr_key_name: {
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
  AttrKey.associate = () => {
    app.model.AttrKey.hasMany(app.model.AttrValue, { foreignKey: 'attr_key_id', targetKey: 'id'});
  }
  return AttrKey;
};