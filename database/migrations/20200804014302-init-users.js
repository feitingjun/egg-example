module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { UUID, STRING } = Sequelize;
      //新增字段
      await queryInterface.addColumn('users', 'headpic', STRING(255));
      await queryInterface.addColumn('users', 'create_by', UUID);
      await queryInterface.addColumn('users', 'update_by', UUID);
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
      //删除字段
      await queryInterface.removeColumn('users', 'headpic');
      await queryInterface.removeColumn('users', 'create_by');
      await queryInterface.removeColumn('users', 'update_by');
  },
};