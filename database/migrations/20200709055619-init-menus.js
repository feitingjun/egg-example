module.exports = {
  // 在执行数据库升级时调用的函数，创建 menus 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('menus', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false },
      route: { type: STRING(30), allowNull: false, unique: true },
      sup_id: { type: INTEGER, defaultValue: 0 },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 menus 表
  down: async queryInterface => {
    await queryInterface.dropTable('menus');
  },
};