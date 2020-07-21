module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Menu = app.model.define('menus', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {  type: STRING(30), allowNull: false },
    route: {  type: STRING(30), allowNull: false, unique: true },
    icon: {  type: STRING(30) },
    sup_id: { type: INTEGER, defaultValue: 0 },
  },{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Menu;
};