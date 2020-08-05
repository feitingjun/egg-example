module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { FLOAT } = Sequelize;
      //新增字段
      await queryInterface.addColumn('menus', 'sort', FLOAT(11));
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
      //删除字段
      await queryInterface.removeColumn('menus', 'sort');
  },
};