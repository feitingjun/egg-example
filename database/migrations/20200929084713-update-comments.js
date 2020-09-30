module.exports = {
  // 在执行数据库升级时调用的函数
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize;
      //新增字段
      await queryInterface.addColumn('comments', 'grade', INTEGER);
      await queryInterface.addColumn('comments', 'is_read', INTEGER);
      await queryInterface.addColumn('comments', 'is_anonymity', INTEGER);
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
    //删除字段
    await queryInterface.removeColumn('comments', 'grade');
    await queryInterface.removeColumn('comments', 'is_read');
    await queryInterface.removeColumn('comments', 'is_anonymity');
  },
};