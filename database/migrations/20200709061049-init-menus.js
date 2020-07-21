module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { INTEGER, DATE, STRING } = Sequelize;
      //新增字段
      await queryInterface.addColumn('menus', 'icon', STRING(30));
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
      const { INTEGER, DATE, STRING } = Sequelize;
      //删除字段
      await queryInterface.removeColumn('menus', 'icon');
  },
};