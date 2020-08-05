module.exports = app => {
  const { STRING, INTEGER, FLOAT } = app.Sequelize;

  const Role = app.model.define('roles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {  type: STRING(30), allowNull: false },
    auth: STRING,
    sort: FLOAT(11),
    remark: STRING,
  },{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Role;
};