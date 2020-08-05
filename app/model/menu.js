module.exports = app => {
  const { STRING, INTEGER, FLOAT } = app.Sequelize;

  const Menu = app.model.define('menus', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {  type: STRING(30), allowNull: false },
    route: {  
      type: STRING(30), 
      allowNull: false, 
      unique: true,
      validate: {
        isUnique: (route, next) => {
          Menu.findOne({ where: { route: route } })
            .done(data => {
              if (data) {
                next("路由已存在");
              } else {
                next();
              }
            })
        }
      }
    },
    icon: {  type: STRING(30) },
    pid: { type: INTEGER, defaultValue: 0 },
    sort: FLOAT(11),
  },{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Menu;
};