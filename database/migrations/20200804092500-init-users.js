module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
      const { UUID } = Sequelize;
      //新增字段
      await queryInterface.addColumn('users', 'role_id', UUID);
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
      //删除字段
      await queryInterface.removeColumn('users', 'role_id');
  },
};