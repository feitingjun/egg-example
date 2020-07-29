module.exports = {
  // 在执行数据库升级时调用的函数
  up: async (queryInterface, Sequelize) => {
    const { UUID, STRING } = Sequelize;
    //重命名字段名
    await queryInterface.renameColumn('menus', 'sup_id', 'pid');
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.renameColumn('menus', 'pid', 'sup_id');
  },
};