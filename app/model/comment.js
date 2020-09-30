module.exports = app => {
  const { UUID, STRING, UUIDV4, INTEGER } = app.Sequelize;

  const Comment = app.model.define('comments', {
    id: { 
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    goods_id: UUID, 
    pid: UUID, //父级评论id
    from_uid: UUID, //评论人id
    to_uid: UUID, //回复对象id
    content: STRING, //评论内容
    picture: STRING, //评论图片
    grade: INTEGER, //评价等级
    is_read: { //是否已读
      type: INTEGER,
      defaultValue: 0
    }, 
    is_anonymity: { //是否匿名
      type: INTEGER,
      defaultValue: 0
    }, 
  },{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.WeappUser, { foreignKey: 'from_uid', targetKey: 'id', as: 'from_user' });
    app.model.Comment.belongsTo(app.model.WeappUser, { foreignKey: 'to_uid', targetKey: 'id', as: 'to_user' });
  }
  return Comment;
};