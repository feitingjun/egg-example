module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Menu = app.model.define('menus', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {  type: STRING(30), allowNull: false },
    route: {  
      type: STRING(30), 
      allowNull: false, 
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }, 
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
  },{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Menu;
};