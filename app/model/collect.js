module.exports = app => {
  const { UUID, INTEGER, UUIDV4 } = app.Sequelize;

  const Collect = app.model.define('collects', {
    id: { 
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    uid: UUID,
    type: INTEGER, // 1商品
    record_id: UUID,
  },{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Collect;
};